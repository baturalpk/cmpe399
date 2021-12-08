const Sequelize = require('sequelize');
const sequelize = require('../db/config/connect');
const Devices = require('../db/models/devices');
const createError = require('http-errors');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

module.exports.consumptions = async (req, res, next) => {
    const { id } = req.body;
    const { offset, limit, dateMin, dateMax } = req.query;

    if (! offset || ! limit) 
        next(createError(StatusCodes.BAD_REQUEST, '"Offset or limit values are not provided!'));

    try {
        const consumptions = await sequelize.query(`
            select dc.id, dc.device_id, dc.power, dc.created_at, count(dc.id) over() as total_rows
            from daily_consumptions dc
                    left outer join devices d on dc.device_id = d.id
                    left outer join consumers c on d.consumer_id = c.id
            where c.id = ${id}
                and d.is_active = true
                and dc.created_at <= ${dateMax || "'2030-12-29'"}
                and dc.created_at >= ${dateMin || "'2010-01-01'"}
            order by dc.created_at desc
            limit ${limit} offset ${offset};`, { type: Sequelize.QueryTypes.SELECT });
        res
            .status(StatusCodes.OK)
            .json(consumptions)
            .end();
    } catch(err) {
        console.log(err);
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

module.exports.bills = async (req, res, next) => {
    const { id } = req.body;
    const { offset, limit, year, month } = req.query;

    if (! year || ! month) 
        next(createError(StatusCodes.BAD_REQUEST, 'Year or month values are not provided!'));

    const monthStr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    try {
        const bills = await sequelize.query(`
            select *
            from bills_${monthStr[month].substring(0, 3).toLowerCase()}_${year}
            where consumer_id = ${id}
            order by created_at desc
            limit 1 offset 0;`, { type: Sequelize.QueryTypes.SELECT });
        res
            .status(StatusCodes.OK)
            .json(bills)
            .end();
    } catch(err) {
        console.log(err);
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

module.exports.devices = async (req, res, next) => {
    const { deviceID } = req.query;

    if (! deviceID)
        next(createError(StatusCodes.BAD_REQUEST, 'Device ID must be provided for this endpoint!'));

    try {
        const device = await sequelize.query(`    
            select d.id,
                    brand,
                    model,
                    date_of_registration,
                    is_active,
                    street,
                    additional_info,
                    city,
                    country,
                    postal_code
            from devices d
                    left outer join device_addresses da on d.id = da.device_id
                    left outer join addresses a on da.address_id = a.id
            where d.id = ${deviceID};
        `);

        if (!device) next(createError(StatusCodes.NOT_FOUND));
        else {
            res
                .status(StatusCodes.OK)
                .json(device[0])
                .end();
        }
    } catch(e) {
        console.log(e);
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR));
    }
}
