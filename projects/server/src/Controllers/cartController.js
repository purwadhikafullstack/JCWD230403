const { Op } = require('sequelize');
const models = require('../models');
const { v4: uuidv4 } = require('uuid');
const cart = require('../models/cart');
const { sequelize } = require('../models');
// const {} = require('')

module.exports = {
    addToCart: async (req, res, next) => {
        try {
            // const { quantity } = req.body;
            // const { userId } = req.decrypt.id

            const getUser = await models.user.findAll({
                where: {
                    uuid: req.decrypt.uuid,
                    isVerified: req.decrypt.isVerified,
                    roleId: req.decrypt.roleId
                }
            }) 
            // console.log('ini get user:', getUser);

            const { productId, quantity } = req.body

            if (getUser.length > 0) {
                const uuid = uuidv4()

                // 1. cari product by id di model cart
                const getCart = await models.cart.findAll({
                    where: {
                        productId: productId
                    },
                    include: [
                        {
                            model: models.product,
                            include: [
                                {
                                    model: models.stockBranch,
                                    atritbuttes: ["product_id", "stock", "branch_id"],
                                    // where: {
                                    //     product_id: { [Op.like]: `%${product_id}%` }
                                    // }
                                }
                            ]
                        }
                    ]
                })

                // console.log('ini getcart  stock branch id: ', getCart[0].dataValues.product.dataValues.stockBranchId)
                const stockBranchId = getCart[0].dataValues.product.dataValues.stockBranchId

                // 2. jika ada, patch produk tsb untuk di tambahkan quantitynya
                if (getCart.length !== 0) {
                    let findProductQuantity = await models.cart.findOne({
                        attributes: ['quantity', 'productId', 'id'],
                        where: {
                            productId
                        }
                    })

                    // console.log('ini findProductQuantity: ', findProductQuantity.dataValues)
                    // console.log('ini req.body.quantity:', quantity)

                    // let newQty = findProductQuantity.dataValues.quantity + quantity
                    // console.log('ini newqty: ', newQty)

                    const updateQty = await models.cart.update({
                        quantity: findProductQuantity.dataValues.quantity + quantity
                    }, {
                        where: {
                            id: findProductQuantity.dataValues.id
                        }
                    })

                    const getNew = await models.cart.findOne({
                        where: {
                            id: findProductQuantity.dataValues.id
                        }
                    })

                    // console.log('ini hasil update: ', updateQty)

                    return res.status(200).send({
                        message: 'data updated',
                        data: {
                            status: updateQty,
                            data: getNew
                        }
                    })
                } else {
                    // 3. jika tidak ada, gunakan create ke model cart
                    const addToCart = await models.cart.create({
                        uuid,
                        userId: req.decrypt.id,
                        productId: productId,
                        quantity: quantity,
                        stockBranchId: stockBranchId
                    })

                    return res.status(200).send({
                        message: 'data add to cart',
                        data: addToCart
                    })
                }

            }
            // 4. get all cart
        } catch (error) {
            console.log(error);
            next(error)
        }
    },

    // addExistingProduct: async (req, res, next) => {
    //     try {
    //         const { productId } = req.params
    //         const { quantity } = req.body
    //         const updateQty = await models.cart.findAll({
    //             where: {
    //                 // id: id,
    //                 productId: productId,
    //             },
    //             include: [
    //                 {
    //                     model: models.product,
    //                     include: [{ model: models.stockBranch }]
    //                 }
    //             ]
    //         })

    //         const stock = updateQty[0].dataValues.product.dataValues.stockBranches[0].stock
    //         // console.log('ini stock dari updateQty: ', stock);

    //         if (updateQty[0].quantity + quantity > stock) {
    //             return res.status(400).send({
    //                 message: 'Out of stock'
    //             })
    //         }

    //         if (!quantity) {
    //             await models.cart.update({
    //                 quantity: updateQty[0].quantity + 1
    //             },
    //                 {
    //                     where: {
    //                         id: updateQty[0].id
    //                     }
    //                 }
    //             )
    //             return res.status(200).send({
    //                 message: 'product updated'
    //             })
    //         }

    //         if (quantity) {
    //             await models.cart.update({
    //                 quantity: updateQty[0].quantity + quantity
    //             }, {
    //                 where: { id: updateQty[0].id }
    //             })
    //             return res.status(200).send({
    //                 message: 'product updated'
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         next(error)
    //     }
    // },
    getAllCartItem: async (req, res, next) => {
        try {
            const getUser = await models.user.findAll({
                where: {
                    uuid: req.decrypt.uuid,
                    isVerified: req.decrypt.isVerified,
                    roleId: req.decrypt.roleId
                }
            })
            // console.log('ini get user:', getUser);

            if (getUser.length > 0) {

                const getUsersCart = await models.cart.findAll({
                    where: {
                        [Op.and]: [
                            // { isChecked: 0 },
                            { userId: req.decrypt.id }
                        ],
                    },
                    include: [
                        {
                            model: models.product,
                            // include: [{ model: models.stockBranch }]
                        }
                    ],
                    order: [["createdAt", "DESC"]]
                })
                return res.status(200).send({
                    message: 'get user\'s cart',
                    data: getUsersCart
                })
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    checkProduct: async (req, res, next) => {
        try {
            let getCart = await models.cart.findAll({
                where: {
                    id: req.params.id
                }
            })
            // console.log('Data dari getCartId', getCart)

            if (getCart[0].dataValues.isChecked === false) {
                const checked = await models.cart.update({
                    isChecked: 1
                }, {
                    where: {
                        id: req.params.id
                    }
                })

                res.status(200).send({
                    success: true,
                    message: "checked",
                    data: checked
                })
            } else {
                const unChecked = await models.cart.update({
                    isChecked: 0
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                res.status(200).send({
                    success: true,
                    message: "unChecked",
                    data: unChecked
                })
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    checkAllProduct: async (req, res, next) => {
        try {
            const checkAllProduct = await models.cart.findAll({
                where: { userId: req.decrypt.id },
                include: [
                    { model: models.product },
                ],
            })

            const productCheck = checkAllProduct.map((val) => val.isChecked)

            if (!productCheck.includes(false)) {
                await models.cart.update(
                    { isChecked: false },
                    { where: { userId: req.decrypt.id } }
                )

                const uncheckAllProduct = await models.cart.findAll({
                    where: { userId: req.decrypt.id },
                    include: [
                        { model: models.product },
                    ],
                })

                return res.status(200).send({
                    message: "All Product Uncheck",
                    data: uncheckAllProduct,
                })
            }

            await models.cart.update(
                { isChecked: true },
                { where: { userId: req.decrypt.id } }
            )

            const findCheckAllProduct = await models.cart.findAll({
                where: { userId: req.decrypt.id },
                include: [
                    { model: models.product },
                ],
            })

            return res.status(200).send({
                message: "All Product Checked",
                data: findCheckAllProduct,
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    // increase & decrease
    decreaseQty: async (req, res, next) => {
        try {
            const { id } = req.params

            const findProduct = await models.cart.findAll({
                where: {
                    id: id
                }
            })

            // console.log('ini findProduct dari decQty: ', findProduct[0].dataValues.quantity)

            if (findProduct[0].dataValues.quantity <= 1) {
                return res.status(200).send({
                    message: "Minimum quantity product is 1",
                })
            }

            await models.cart.update(
                { quantity: findProduct[0].dataValues.quantity - 1 },
                { where: { id: findProduct[0].id } }
            )

            return res.status(200).send(
                {
                    message: "Quantity decreased"
                })
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    addQty: async (req, res, next) => {
        try {
            const { id } = req.params
            // const { quantity } = req.body.quantity

            const findProduct = await models.cart.findAll({
                where: {
                    id: id
                },
                include: [
                    {
                        model: models.product,
                        // atritbuttes: ["id", "name", "stockBranchId"],
                        include: [
                            {
                                model: models.stockBranch
                                // atritbuttes: ["stock"]
                            }
                        ]
                    }
                ]
            })

            // console.log('ini dari findProduct addQty: ', findProduct[0].dataValues.product.dataValues.stockBranches[0].stock)

            const stock = findProduct[0].dataValues.product.dataValues.stockBranches[0].stock

            if (findProduct[0].quantity + 1 > stock) {
                return res.status(400).send({
                    message: 'you are at maximum product\'s stock available'
                })
            }

            await models.cart.update({
                quantity: findProduct[0].quantity + 1
            }, {
                where: { id: findProduct[0].id }
            })

            return res.status(200).send({
                message: 'added quantity'
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },
    totalPrice: async (req, res, next) => {
        try {
            const cartData = await models.cart.findAll({
                where: {
                    userId: req.decrypt.id,
                    isChecked: 1
                },
                include: [
                    {
                        model: models.product,
                        attritbutes: ['price']
                    }
                ]
            })

            console.log('ini cart data: ', cartData)

            return res.status(200).send({
                message: 'Total price',
                data: cartData
            })


        } catch (error) {
            console.error(error);
            next(error)
        }
    },

    getCartById: async (req, res, next) => {
        try {
            const { id } = req.params
            const getCartById = await models.cart.findAll({
                where: {
                    id: id
                },

                include: [
                    {
                        model: models.product,
                        include: [{ model: models.stockBranch }],
                    },
                ],
            })
            return res.status(200).send({
                message: "Get Cart By Id",
                data: getCartById,
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    getCartProductById: async (req, res, next) => {
        try {
            const { productId } = req.params
            const getCartProductById = await models.cart.findAll({
                where: {
                    productId: productId
                }, include: [
                    {
                        model: models.product,
                        include: [{
                            model: models.stockBranch
                        }]
                    }
                ]
            })
            return res.status(200).send({
                message: "get product cart by Id",
                data: getCartProductById
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const { id } = req.params

            await models.cart.destroy({
                where: {
                    id: id
                },
            })
            return res.status(200).send({
                message: "Item has been removed from your cart"
            })

        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    deleteAllProduct: async (req, res, next) => {
        try {
            await models.cart.destroy({
                where: {
                    userId: req.decrypt.id
                }
            })
            return res.status(200).send({
                message: 'All items has been removed from your cart'
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}
