const createError = require("http-errors");
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const redis = require('../utils/redis');

module.exports = (req, res, next) => {
    const { id, token } = req.body;

    if (!id || !token) next(createError(StatusCodes.FORBIDDEN, "ID and tokens are required!"));

    jwt.verify(req.body.token, process.env.JWT_SECRET, (err, callback) => {
        if (err)
            next(createError(StatusCodes.UNAUTHORIZED));
        else {
            if (callback) {
                redis.SISMEMBER(id, token, (err, reply) => {
                    if (err) next(createError(StatusCodes.INTERNAL_SERVER_ERROR));
                    else {
                        console.log("validate token: ", reply);
                        if (reply === 1) {
                            next();
                        } else {
                            next(createError(StatusCodes.UNAUTHORIZED, "Token is expired or no user found with the given ID!"));
                        }
                    }
                });
            } else {
                next(createError(StatusCodes.UNAUTHORIZED));
            }
        }
    });
}
