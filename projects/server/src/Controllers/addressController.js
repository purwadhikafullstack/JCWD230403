const sequelize = require('sequelize');
const model = require('../models');

module.exports = {
    addressList: async (req, res, next) => {
        try {
            let getAddress = await model.addresses.findAll()
            res.status(200).send(getAddress)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}