const { Op } = require('sequelize');
const models = require('../models');
const { v4: uuidv4 } = require('uuid');
const cart = require('../models/cart');
const { sequelize } = require('../models');
module.exports = {
    getChecked: async (req, res, next) => {
        try {
            const getUser = await models.user.findAll({
                where: {
                    uuid: req.decrypt.uuid,
                    isVerified: req.decrypt.isVerified,
                    roleId: req.decrypt.roleId
                }
            })
            // console.log('ini id getUser: ', getUser[0].dataValues.id)
            if (!getUser.length) {
                return res.status(401).send({
                    message: 'you have to login first'
                })
            } else {
                const data = await models.cart.findAll({
                    where: {
                        [Op.and]: [{ userId: getUser[0].dataValues.id }, { isChecked: 1 }]
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
            }
        } catch (error) {
            console(error)
            next(error)
        }
    },
    createTransaction: async (req, res, next) => {
        try {
            // 1. find id user
            const getUser = await models.user.findAll({
                where: {
                    uuid: req.decrypt.uuid,
                    isVerified: req.decrypt.isVerified,
                    roleId: req.decrypt.roleId
                }
            })
            // console.log('ini dari getUser: ', getUser)

            // get cart checked
            const cartItems = await models.cart.findAll({
                where: {
                    [Op.and]: [{ userId: getUser[0].dataValues.id }, { isChecked: 1 }]
                },
                include: [
                    {
                        model: models.product,
                        include: [{
                            model: models.stockBranch
                        }]
                    }
                ],
                order: [["createdAt", "DESC"]]
            })

            // console.log('cart items id: ', cartItems[0].dataValues.product.dataValues.stockBranches[0].dataValues.id)
            // console.log('cart items stock: ', cartItems[0].dataValues.product.dataValues.stockBranches[0].dataValues.stock)

            const uuid = uuidv4()
            // 2. create transaction
            const checkout = await models.transaction.create({
                uuid,
                shippingMethod: req.body.shippingMethod,
                amount: req.body.amount,
                userId: getUser[0].dataValues.id,
            })
            for (const product of cartItems) {
                // console.log('ini product dr cart items:', product.product.stockBranches.stock)
                // console.log('ini mau dapetin id nya:', product.product.stockBranchId)
                // console.log('ini quantity yg dibeli: ', product.quantity)
                const stockBranch = await models.stockBranch.findOne({
                    where: {
                        id: product.product.stockBranchId
                    },
                });
                // console.log('ini stockBranch:', stockBranch.stock)

                if (!stockBranch) {
                    return res.status(404).send({ message: 'Product stock not found' });
                }

                const updatedStock = stockBranch.stock - product.quantity;
                console.log(updatedStock)
                // if (updatedStock < 0) {
                //     return res.status(400).send({ message: 'Insufficient stock' });
                // }
                await models.stockBranch.update(
                    { stock: updatedStock },
                    { where: { id: stockBranch.id } }
                );

                //     // 4. Buat detail transaksi
                await models.transaction_detail.create({
                    // productId: product.productId,
                    invoice: uuid,
                    transactionId: checkout.id,
                    quantity: product.quantity,
                    totalCheckOut: checkout.amount
                });

            }

            //   // 5. Hapus keranjang yang dicek (cart yang checked)
            // await models.cart.destroy({
            //     where: {
            //         userId: req.decrypt.id,
            //         isChecked: 1
            //     }
            // });
            res.status(200).send({
                message: 'success',
                data: checkout
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    getCurrentTransaction: async (req, res, next) => {
        try {
            const getUser = await models.user.findAll({
                where: {
                    uuid: req.decrypt.uuid,
                    isVerified: req.decrypt.isVerified,
                    roleId: req.decrypt.roleId
                }
            })
            if (getUser) {
                // const { id } = req.params
                const order = await models.transaction_detail.findAll({
                    where: {
                        transactionId: req.params.id
                    }
                })
                console.log('ini order detail:', order)
                return res.status(200).send({
                    message: 'get curren transaction',
                    data: order
                })
            }

        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    payment: async (req, res, next) => {
        try {
            if (req.files) {

                const findOrderId = await models.transaction.findOne({
                    where: {
                        uuid: req.decrypt.uuid
                    },
                });

                // console.log('ini findOrderId: ', findOrderId)

                if (!findOrderId) {
                    return res.status(404).send({
                      message: 'Transaction not found'
                    });
                  }

                const orderId = findOrderId.id;

                await models.transaction.update(
                    {
                        paymentProof: `/payment/${req.files[0]?.filename}`,
                        status: 'Waiting for confirmation payment'
                    },
                    {
                        where: {
                            id: orderId,
                        },
                    }
                );

                res.status(200).send({
                    success: true
                });
            } else {
                res.status(400).send({
                    message: "Please ensure that an image is chosen"
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },


}