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
                },
                include: [
                    {
                        model: models.product
                    }],
                order: [["createdAt", "DESC"]]
            })

            res.status(200).send({
                message: 'get checked item in your cart',
                data: data
            })
        } catch (error) {
            console(error)
            next(error)
        }
    },
    checkoutTransaction: async(req, res, next) => {
        try {
            const response = await models.cart.destroy({
                where: {
                    isChecked: 1
                }
            })

            return res.status(200).send({
                message: 'removed cart item from cart',
            })
        } catch (error) {
            
        }
    }
}