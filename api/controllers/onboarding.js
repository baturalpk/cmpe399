const Sequelize = require('sequelize');
const sequelize = require('../db/config/connect');
const Consumer = require('../db/models/consumers');
const ConsumerAddress = require('../db/models/consumer_addresses');
const Address = require('../db/models/addresses');
const createError = require('http-errors');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const redis = require('../utils/redis');

module.exports.register = async (req, res, next) => {
    const { email, password, fullName, phone, address } = req.body;
    try {
        let newConsumerID, newAddressID;

        const oldConsumers = await Consumer(sequelize, Sequelize.DataTypes).findAll({
            where: { email: email },
        });
        if (oldConsumers.length >= 1)
            next(createError(StatusCodes.BAD_REQUEST));

        const hash = bcrypt.hashSync(password, saltRounds);

        await Consumer(sequelize, Sequelize.DataTypes).create({
            email: email,
            password: hash,
            full_name: fullName,
            phone: BigInt(phone.replace(/\s/g,''))
        });

        const newConsumer = await Consumer(sequelize, Sequelize.DataTypes).findAll({
            where: { email: email },
        });
        newConsumerID = newConsumer[0].dataValues.id;

        await Address(sequelize, Sequelize.DataTypes).create({
            street: address.street,
            postal_code: address.postalCode,
            city: address.city,
            country: address.country,
            additional_info: address.additionalInfo || null,
            state: address.state || null
        });
        newAddressID = (await Address(sequelize, Sequelize.DataTypes).findAll({
            where: { 
                street: address.street,
                postal_code: address.postalCode,
                city: address.city,
                country: address.country
             }
        }))[0].id;

        console.log("XD ==>", newConsumerID, newAddressID);
        await ConsumerAddress(sequelize, Sequelize.DataTypes).create({
            consumer_id: newConsumerID,
            address_id: newAddressID
        });

        res
            .status(StatusCodes.CREATED)
            .send(ReasonPhrases.CREATED);

    } catch (err) {
        console.log(err);
        if (err instanceof Sequelize.ValidationError) {
            next(createError(StatusCodes.BAD_REQUEST));
        } else {
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }
}

module.exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) 
        next(createError(StatusCodes.FORBIDDEN, "Email and password fields are required!"));

    try {
        const consumers = await sequelize.query(`
            select c.id,
                   email,
                   password,
                   full_name,
                   phone,
                   street,
                   additional_info,
                   postal_code,
                   city,
                   state,
                   country
            from consumers c,
                 consumer_addresses ca,
                 addresses a
            where c.id = ca.consumer_id
              and a.id = ca.address_id
              and c.email = '${email}';         
        `);

        if (consumers[0].length === 0) 
            next(createError(StatusCodes.NOT_FOUND, 'The given email or password not found!'));

        var consumer = consumers[0][0];
        const id = consumer['id']
        const encryptedPassword = consumer['password']

        bcrypt.compare(password, encryptedPassword, (err, result) => {
            if (result) {
                // LOGIN - Success
                jwt.sign({payload: id}, process.env.JWT_SECRET, { expiresIn: "2 days" }, (err, newToken) => {
                    if (err) res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
                    else {
                        redis.SADD([id, newToken], (err, reply) => {
                            if (err) {
                                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
                                return;
                            }

                            redis.SMEMBERS(id, (err, reply) => {
                                console.log('REDIS:', reply);
                            });
                          });
                        
                        res
                            .status(StatusCodes.OK)
                            .json({
                                'id': id,
                                'email': consumer['email'],
                                'fullName': consumer['full_name'],
                                'phone': consumer['phone'],
                                'token': newToken,
                                'address': {
                                    'street': consumer['street'],
                                    'additionalInfo': consumer['additional_info'] || '',
                                    'postalCode': consumer['postal_code'] || '',
                                    'city': consumer['city'],
                                    'state': consumer['state'] || '',
                                    'country': consumer['country']
                                }
                            })
                            .end();
                    }
                });

                return
            }

            // LOGIN - Failure
            res
                .status(StatusCodes.UNAUTHORIZED)
                .send(ReasonPhrases.UNAUTHORIZED)
        });  
    } catch(err) {
        console.log(err);
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR))
    }
}
