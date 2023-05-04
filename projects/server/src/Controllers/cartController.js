const { Op } = require('sequelize');
const models = require('../models');
const { v4: uuidv4 } = require('uuid');
const cart = require('../models/cart');
// const {} = require('')

module.exports = {
    addToCart: async (req, res, next) => {
        try {
            // const { quantity } = req.body;
            // 
            // const { userId } = req.decrypt.id

            const getUser = await models.user.findAll({
                where: {
                    uuid: req.decrypt.uuid,
                    isVerified: req.decrypt.isVerified,
                    roleId: req.decrypt.roleId
                }
            })
            // console.log('ini get user:', getUser);


            if (getUser.length > 0) {
                const uuid = uuidv4()
                const { stockBranchId, quantity } = req.body
                const addProduct = await models.cart.create({
                    uuid,
                    stockBranchId,
                    quantity
                })

                // const findProductItem = await models.cart.findAll({
                //     where: {
                //         productId: addProduct.stockBranchId
                //     },
                //     include: [{
                //         models: models.stockBranch
                //     }]
                // })

                return res.status(200).send({
                    message: 'Product added to cart',
                    data: addProduct
                })

            } else {
                console.log(error)
                next(error)
            }
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

        } catch (error) {
            console.log(error);
            next(error)
        }
    },
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
                        userId: req.decrypt.id 
                        // uuid: req.decrypt.uuid,
                        // isVerified: req.decrypt.isVerified,
                        // roleId: req.decrypt.roleId
                    },
                    include: [
                        {
                            model: models.stockBranch,
                            include: [{ model: models.product }]
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
    // getCartProductById: async (req, res) => {
    //     try {
    //       const { ProductId } = req.params
    //       const getCartProductById = await db.Cart.findOne({
    //         where: { ProductId },
    //         include: [
    //           {
    //             model: db.Product,
    //             include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
    //           },
    //         ],
    //       })
    //       return res.status(200).json({
    //         message: "Get Product Cart By Id",
    //         data: getCartProductById,
    //       })
    //     } catch (err) {
    //       console.log(err)
    //       return res.status(500).json({
    //         message: err.message,
    //       })
    //     }
    //   },
    //   getCartById: async (req, res) => {
    //     try {
    //       const { id } = req.params
    //       const getCartById = await db.Cart.findByPk(id, {
    //         include: [
    //           {
    //             model: db.Product,
    //             include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
    //           },
    //         ],
    //       })
    //       return res.status(200).json({
    //         message: "Get Cart By Id",
    //         data: getCartById,
    //       })
    //     } catch (err) {
    //       console.log(err)
    //       return res.status(500).json({
    //         message: err.message,
    //       })
    //     }
    //   },
    //   checkProduct: async (req, res) => {
    //     try {
    //       const { id } = req.params
    
    //       const checkProduct = await db.Cart.findByPk(id)
    
    //       if (checkProduct.is_checked === true) {
    //         await db.Cart.update(
    //           { is_checked: false },
    //           { where: { id: checkProduct.id } }
    //         )
    
    //         const uncheckProduct = await db.Cart.findByPk(id, {
    //           include: [
    //             { model: db.Product, include: [{ model: db.ProductPicture }] },
    //           ],
    //         })
    
    //         return res.status(200).json({
    //           message: "Product Uncheck",
    //           data: uncheckProduct,
    //         })
    //       }
    
    //       await db.Cart.update(
    //         { is_checked: true },
    //         { where: { id: checkProduct.id } }
    //       )
    
    //       const checkProductById = await db.Cart.findByPk(id, {
    //         include: [
    //           { model: db.Product, include: [{ model: db.ProductPicture }] },
    //         ],
    //       })
    
    //       return res.status(200).json({
    //         message: "Product Checked",
    //         data: checkProductById,
    //       })
    //     } catch (err) {
    //       console.log(err)
    //       return res.status(500).json({
    //         message: err.message,
    //       })
    //     }
    //   },
    //   checkAllProduct: async (req, res) => {
    //     try {
    //       const checkAllProduct = await db.Cart.findAll({
    //         where: { UserId: req.user.id },
    //         include: [
    //           { model: db.Product, include: [{ model: db.ProductPicture }] },
    //         ],
    //       })
    
    //       const productCheck = checkAllProduct.map((val) => val.is_checked)
    
    //       if (!productCheck.includes(false)) {
    //         await db.Cart.update(
    //           { is_checked: false },
    //           { where: { UserId: req.user.id } }
    //         )
    
    //         const uncheckAllProduct = await db.Cart.findAll({
    //           where: { UserId: req.user.id },
    //           include: [
    //             { model: db.Product, include: [{ model: db.ProductPicture }] },
    //           ],
    //         })
    
    //         return res.status(200).json({
    //           message: "All Product Uncheck",
    //           data: uncheckAllProduct,
    //         })
    //       }
    
    //       await db.Cart.update(
    //         { is_checked: true },
    //         { where: { UserId: req.user.id } }
    //       )
    
    //       const findCheckAllProduct = await db.Cart.findAll({
    //         where: { UserId: req.user.id },
    //         include: [
    //           { model: db.Product, include: [{ model: db.ProductPicture }] },
    //         ],
    //       })
    
    //       return res.status(200).json({
    //         message: "All Product Checked",
    //         data: findCheckAllProduct,
    //       })
    //     } catch (err) {
    //       return res.status(500).json({
    //         message: err.message,
    //       })
    //     } 
    //   },
    //   // add same product, if product already added just increment the quantity of product
    //   addProductQty: async (req, res) => {
    //     try {
    //       const { ProductId } = req.params
    //       const { quantity } = req.body
    //       const addProductQty = await db.Cart.findOne({
    //         where: { ProductId },
    //         include: [
    //           {
    //             model: db.Product,
    //             include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
    //           },
    //         ],
    //       })
    
    //       const productStock = addProductQty.Product.ProductStocks.map(
    //         (val) => val.stock
    //       )
    //       let subtotal = 0
    
    //       for (let i = 0; i < productStock.length; i++) {
    //         subtotal += Number(productStock[i])
    //       }
    
    //       const totalProductStock = subtotal
    
    //       if (addProductQty.quantity + quantity > totalProductStock) {
    //         return res.status(400).json({
    //           message: "Stok Barang Habis",
    //         })
    //       }
    
    //       if (!quantity) {
    //         await db.Cart.update(
    //           { quantity: addProductQty.quantity + 1 },
    //           { where: { id: addProductQty.id } }
    //         )
    
    //         return res.status(200).json({ message: "Product Added" })
    //       }
    
    //       if (quantity) {
    //         await db.Cart.update(
    //           { quantity: addProductQty.quantity + quantity },
    //           { where: { id: addProductQty.id } }
    //         )
    
    //         return res.status(200).json({ message: "Product Added" })
    //       }
    //     } catch (err) {
    //       console.log(err)
    //       return res.status(500).json({
    //         message: err.message,
    //       })
    //     }
    //   },
    //   totalPrice: async (req, res) => {
    //     try {
    //       const { id } = req.user
    
    //       const getSubTotal = await db.sequelize.query(
    //         `select sum(p.price * c.quantity) as totalPrice, sum(c.quantity) as totalQty from Carts c
    //           join Products p
    //           on c.ProductId = p.id
    //           where is_checked = ${true} && UserId = ${id}`
    //       )
    //       const totalPrice = getSubTotal[0][0]
    
    //       return res.status(200).json({ message: "Total Price", data: totalPrice })
    //     } catch (err) {
    //       console.log(err)
    //       return res.status(500).json({ message: err.message })
    //     }
    //   },
    //   decreaseQty: async (req, res) => {
    //     try {
    //       const { id } = req.params
    
    //       const findProduct = await db.Cart.findByPk(id)
    
    //       if (findProduct.quantity <= 1) {
    //         return res.status(200).json({
    //           message: "Minimal 1 Quantity Produk",
    //         })
    //       }
    
    //       await db.Cart.update(
    //         { quantity: findProduct.quantity - 1 },
    //         { where: { id: findProduct.id } }
    //       )
    
    //       return res.status(200).json({ message: "Quantity Berkurang" })
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   },
    //   addQty: async (req, res) => {
    //     try {
    //       const { id } = req.params
    
    //       const findProduct = await db.Cart.findByPk(id, {
    //         include: [
    //           {
    //             model: db.Product,
    //             include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
    //           },
    //         ],
    //       })
    
    //       const productCart = findProduct.Product.ProductStocks.map(
    //         (val) => val.stock
    //       )
    //       let total = 0
    
    //       for (let i = 0; i < productCart.length; i++) {
    //         total += Number(total[i])
    //       }
    
    //       const subTotal = total
    
    //       if (findProduct.quantity + 1 > subTotal) {
    //         return res.status(400).json({ message: "Stok Produk Habis" })
    //       }
    
    //       await db.Cart.update(
    //         { quantity: findProduct.quantity + 1 },
    //         { where: { id: findProduct.id } }
    //       )
    
    //       return res.status(200).json({ message: "Berhasil Menambah Quantity" })
    //     } catch (err) {
    //       return res.status(500).json({ message: err.message })
    //     }
    //   },
}