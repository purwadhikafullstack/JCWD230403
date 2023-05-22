const { Op } = require('sequelize');
const models = require('../models');
const { v4: uuidv4 } = require('uuid');
const cart = require('../models/cart');
const { sequelize } = require('../models');
const fs = require('fs')
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
                // branchId: req.body.branchId
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
                    invoice: uuid,
                    transactionId: checkout.id,
                    quantity: product.quantity,
                    totalCheckOut: checkout.amount
                });

            }

            //   // 5. Hapus keranjang yang dicek (cart yang checked)
            await models.cart.destroy({
                where: {
                    userId: req.decrypt.id,
                    isChecked: 1
                }
            });
            res.status(200).send({
                message: 'success',
                data: checkout
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    payment: async (req, res, next) => {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).send({
                    message: "Please ensure that an image is chosen",
                });
            }

            const getUser = await models.user.findOne({
                where: {
                    uuid: req.decrypt.uuid,
                },
            });
            const userId = getUser.dataValues.id;

            const getOrder = await models.transaction.findOne({
                attributes: { exclude: ["id", "userId"] },
                where: {
                    uuid: req.query.uuid,
                    userId: userId,
                },
                include: [
                    {
                        model: models.transaction_detail,
                        attributes: { exclude: ["id"] },
                    },
                ],
            });

            if (!getOrder) {
                return res.status(404).send({
                    message: "Transaction not found",
                });
            }

            const orderId = getOrder.id;

            await models.transaction.update(
                {
                    paymentProof: `/payment/${req.files[0].filename}`,
                    status: 'Waiting for confirmation payment'
                },
                {
                    where: {
                        id: orderId,
                    },
                }
            );

            if (
                fs.existsSync(`./src/public${getOrder.dataValues.paymentProof}`) &&
                !getOrder.dataValues.paymentProof.includes("default")
            ) {
                fs.unlinkSync(`./src/public${getOrder.dataValues.paymentProof}`);
            }

            res.status(200).send({
                message: 'File uploaded',
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getAllUserTransaction: async (req, res, next) => {
        try {
            const findTransaction = await models.transaction.findAll({

                where: {
                    userId: req.decrypt.id
                },
                include: [
                    {
                        model: models.user,
                        attributes: ["uuid", "name"],
                    },
                ],
                order: [["createdAt"]],
            });

            console.log('ini findTransaction: ', findTransaction)

            return res.status(200).send({
                success: true,
                data: findTransaction
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getDetail: async (res, req, next) => {
        try {
            const { id } = req.params

            const getCurrentTransaction = await models.transaction.findOne({
                where: {
                    id: req.params.id
                }
            })

            // console.log('ini get current transaction', getCurrentTransaction)

            res.status(200).send({
                data: getCurrentTransaction
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },
    getOrderList: async (req, res, next) => {
        try {

            let { page, size, sort, status } = req.query

            if (req.query.status) {
                let findOrder = await models.transaction.findAndCountAll({
                    offset: parseInt(page * size),
                    limit: parseInt(size),
                    where: {
                        statusId: parseInt(req.query.status),
                    },
                    include: [
                        {
                            model: models.user,
                            attributes: ["uuid", "name"],
                        },

                        {
                            model: models.status,
                            attributes: ["status"],
                        },
                    ],
                    order: [["createdAt", `${req.query.order}`]],
                });

                return res.status(200).send({
                    success: true,
                    data: findOrder.rows,
                    datanum: findOrder.count,
                })
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}