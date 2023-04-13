const { Op } = require('sequelize');
const models = require('../models');
// const {} = require('')

module.exports = {
    addToCart: async (req, res, next) => {
        // const { stockBranchId, quantity, current_price, amount } = req.body;
        // const { userId } = req.decrypt.id

        try {
            // const existingProduct = await models.cart.findOne({
            //     where: {
            //         [Op.and]: [
            //             { status: false },
            //             { stockBranchId: req.body.stockBranchId },
            //             { userId: userId }
            //         ]
            //     }
            // })
            // if (existingProduct) {
            //     return res.status(400).send({
            //         message: "Product is already existed"
            //     })
            // } else {
            //     const addProduct = await models.cart.create({
            //         userId: userId,
            //         stockBranchId,
            //         quantity,
            //         current_price: current_price,
            //         amount: amount
            //     })
            //     return res.status(200).send({
            //         message: "Added",
            //         data: addProduct
            //     })
            // }
            const getUser = await models.user.findAll({
                where: {
                    uuid: req.decrypt.uuid,
                    isVerified: req.decrypt.isVerified,
                    roleId: req.decrypt.roleId
                }
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    },
}