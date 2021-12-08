require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var logger = require('morgan');
var redis = require('./utils/redis')

// import routers
const ROUTER_PREFIX = `/api/v${process.env.API_VERSION}`; //** e.g. "/api/v0"
var devicesRouter = require('./routes/devices');
var billsRouter = require('./routes/bills');
var consumptionsRouter = require('./routes/consumptions');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

var app = express();
var sequelize = require('./db/config/connect');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// set up routers
app.use(ROUTER_PREFIX + '/register', registerRouter);
app.use(ROUTER_PREFIX + '/login', loginRouter);
app.use(ROUTER_PREFIX + '/consumptions', consumptionsRouter);
app.use(ROUTER_PREFIX + '/bills', billsRouter);
app.use(ROUTER_PREFIX + '/devices', devicesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('ENV') === 'development' ? err : {};
  
  res.sendStatus(err.status || 500);
});

// test the Postgres & Redis connections
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully!');
  } catch (err) {
    console.error('Unable to connect to the db => /n', err);
    process.exit(1);
  }

  redis.on('error', (err) => {
    console.log(err);
    process.exit(1);
  });
})();

module.exports = app;
