const { Op } = require('sequelize');
const models = require('../models');
const { v4: uuidv4 } = require('uuid');
const cart = require('../models/cart');
const { sequelize } = require('../models');
module.exports = {
    getChecked: async (req, res, next) => {
        try {
            const data = await models.cart.findAll({
                where: {
                    isChecked: 1
                }
            })

            res.status(200).send({
                message: 'get checked item in your cart',
                data: data
            })
        } catch (error) {
            console(error)
            next(error)
        }
    }
}