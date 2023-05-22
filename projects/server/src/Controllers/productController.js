const sequelize = require('sequelize');
const model = require('../models');
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

// Fungsi untuk memformat harga menjadi format mata uang Rupiah
function formatCurrency(price) {
    return price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });
}

module.exports = {
    allProduct: async (req, res, next) => {
        try {

            let get = await model.product.findAll({
                attributes: ['uuid', 'name', 'price', 'description']
            })

            console.log("Data dari get :", get[0].dataValues);

            res.status(200).send(get)

        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    list: async (req, res, next) => {
        try {
            let { page, size, name, sortby, order } = req.query;
            if (!page) {
                page = 0;
            }
            if (!size) {
                size = 6;
            }
            if (!sortby) {
                sortby = 'name'
            }
            if (!order) {
                order = 'ASC'
            }
            if (!name) {
                name = req.query
            }

            let get = await model.product.findAndCountAll({
                attributes: ["uuid", "name", "price", "image", "description"],
                offset: parseInt(page * size),
                limit: parseInt(size),
                order: [[sortby, order]],
            })
            return res.status(200).send({
                data: get.rows,
                totalPages: Math.ceil(get.count / size),
                datanum: get.count,
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    // allStock: async (req, res, next) => {
    //     try {
    //         let { sortby, order, page, size, branch_id, longitude, latitude, product_id, stock, category, name } = req.query;

    //         if (!sortby) {
    //             sortby = "name";
    //         }
    //         if (!order) {
    //             order = "ASC";
    //         }
    //         if (!page) {
    //             page = 0;
    //         }
    //         if (!size) {
    //             size = 6;
    //         }


    //         let offset = parseInt(page) * parseInt(size)

    //         let get = await model.product.findAndCountAll({
    //             where: {
    //                 isDeleted: false
    //             },
    //             include: [
    //                 {
    //                     model: model.categories, attributes: ["category"],
    //                     where: {
    //                         category: { [sequelize.Op.like]: `%${category}%` }
    //                     }
    //                 },
    //                 {
    //                     model: model.stockBranch,
    //                     attributes: ["product_id", "branch_id", "stock"],
    //                     where: {
    //                         branch_id: {
    //                             [sequelize.Op.like]: `%${branch_id}%`,
    //                         },
    //                         product_id: {
    //                             [sequelize.Op.like]: `%${product_id}%`,
    //                         },
    //                         stock: {
    //                             [sequelize.Op.like]: `%${stock}%`,
    //                         }
    //                     },
    //                     include: [
    //                         {
    //                             model: model.branch,
    //                             attributes: ['name']
    //                         },
    //                         // get[0].datavalue.name = get[0].dataValues.branch.name
    //                     ]
    //                 },
    //             ],
    //             attributes: ["name", "price", "image"],
    //             order: [[sortby, order]],
    //             limit: parseInt(size),
    //             offset: offset
    //         })

    //         // console.log("Data dari get :", get[0].dataValues);
    //         // console.log("Data dari get :", get[0].dataValues.price);
    //         // console.log("Data dari get category :", get[0].dataValues.category.dataValues.category);
    //         // console.log("Data dari get branch :", get[0].dataValues.stockBranches[0].dataValues.branch.dataValues.name);


    //         // res.status(200).send(get);


    //         if (get.rows.length === 0) {
    //             return res.status(404).send({
    //                 message: 'No data found'
    //             });
    //         }
    //         return res.status(200).send({
    //             data: get.rows,
    //             offset: offset,
    //             limit: parseInt(size),
    //             totalPages: Math.ceil(get.count / size),
    //             datanum: get.count,
    //         })
    //     } catch (error) {
    //         console.log(error);
    //         next(error);
    //     }
    // },
    allStock: async (req, res, next) => {
        try {
            const date = new Date();
            console.log('ini dari variable date', date);
            let day = date.getDate()
            console.log('ini dari variable day', day);
            let currentDate = new Date().toISOString().split('T')[0]
            console.log('ini dari currentDate', currentDate);

            let { sortby, order, page, size, branch_id, longitude, latitude, product_id, stock, category, name } = req.query;

            if (!sortby) {
                sortby = "name";
            }
            if (!order) {
                order = "ASC";
            }
            if (!page) {
                page = 0;
            }
            if (!size) {
                size = 6;
            }


            let offset = parseInt(page) * parseInt(size)

            let get = await model.product.findAndCountAll({

                include: [
                    {
                        model: model.categories, attributes: ["category"],
                        where: {
                            category: { [sequelize.Op.like]: `%${category}%` }
                        }
                    },
                    {
                        model: model.stockbranch,
                        attributes: ["product_id", "branch_id", "stock"],
                        where: {
                            branch_id: {
                                [sequelize.Op.like]: `%${branch_id}%`,
                            },
                            product_id: {
                                [sequelize.Op.like]: `%${product_id}%`,
                            },
                            stock: {
                                [sequelize.Op.like]: `%${stock}%`,
                            }
                        },
                        include: [
                            {
                                model: model.branch,
                                attributes: ['name']
                            },
                        ]
                    },
                    {
                        model: model.discount,
                        attributes: [
                            'nameDiscount', 
                            'specialPrice', 
                            'activeDate', 
                            'endDate', 
                            'productId', 
                            'isDeleted',
                            [sequelize.literal(`CASE WHEN activeDate <= '${currentDate}' AND endDate >= '${currentDate}' THEN 'active' ELSE 'inactive' END`), 'status']
                        ],
                        required: false,
                        where: {
                            activeDate: {
                                [sequelize.Op.lte]: currentDate
                            },
                            endDate: {
                                [sequelize.Op.gte]: currentDate
                            },
                            isDeleted: {
                                [sequelize.Op.in]: [false]
                            }
                        }
                    }
                ],
                attributes: ["name", "price", "image"],
                order: [[sortby, order]],
                limit: parseInt(size),
                offset: offset
            })

            if (get.rows.length === 0) {
                return res.status(404).send({
                    message: 'No data found'
                });
            }
            return res.status(200).send({
                currentDate: currentDate,
                data: get.rows,
                offset: offset,
                limit: parseInt(size),
                totalPages: Math.ceil(get.count / size),
                datanum: get.count,
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    allBranch: async (req, res, next) => {
        try {

            let get = await model.branch.findAll({
                attributes: ['id', 'name', 'postalCode', 'phone', 'longitude', 'latitude', 'city', 'province', 'subDistrict']
            })

            console.log("Data dari get :", get[0].dataValues);

            res.status(200).send(get);

        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getDetailProduct: async (req, res, next) => {
        try {
            // const userCordinate = await model.address.findOne({
            //     where: {
            //         userId: req.decrypt.id,
            //     },
            //     include: [
            //         {
            //             model: model.user,
            //         }
            //     ]
            // });
            // const lat = userCordinate.latitude;
            // const lon = userCordinate.longitude;

            const getProductDetail = await model.product.findAll({
                where: {
                    id: req.params.id,
                },
                include: [
                    {
                        model: model.stockbranch,
                        // where: {
                        //     stock: stock
                        // }
                        attributes: ['stock']
                    }
                ]
            })
            console.log("ini data dari getProductDetail :", getProductDetail);
            res.status(200).send(getProductDetail)


            // res.status(200).send({
            //     message: 'get product by id',
            //     data: getProductDetail
            // })

        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    // PRODUCT LIST FOR ADMIN DASHBOARD
    productList: async (req, res, next) => {
        try {
            let {
                page,
                size,
                sortby,
                order,
                name,
                category,
                product_id,
                branch_id,
                stock,
                branchname
            } = req.query

            if (!page) {
                page = 0;
            }
            if (!size) {
                if (sortby === 'category' || sortby === 'stock') {
                    size = 100
                } else {
                    size = 5;
                }
            }
            if (!sortby) {
                sortby = "name";
            }
            if (!order) {
                order = "ASC";
            }
            if (!category) {
                category = ''
            }
            if (!stock) {
                stock = ''
            }
            if (!branch_id) {
                branch_id = '';
            }
            if (!branchname) {
                branchname = ''
            }

            let offset = parseInt(page * size)
            if (name) {
                offset = 0
            }

            const dataSortby = () => {
                if (sortby === 'name') {
                    return ['name', order];
                } else if (sortby === 'price') {
                    return ['price', order];
                } else if (sortby === 'category') {
                    return [model.categories, 'category', order];
                } else if (sortby === 'stock') {
                    return [model.stockbranch, 'stock', order];
                } else if (sortby === 'branchname') {
                    return [{ model: model.stockbranch, include: [model.branch] }, model.branch, 'name', order]
                }
            };

            let getProduct = await model.product.findAndCountAll({
                attributes: ['name', 'price', 'category_id', 'stockBranchId'],
                where: {
                    name: { [sequelize.Op.like]: `%${name}%` },
                },
                include: [
                    {
                        model: model.categories,
                        attributes: ['category'],
                        category: { [sequelize.Op.like]: `%${category}%` }
                    },
                    {
                        model: model.stockbranch,
                        attributes: ['product_id', 'branch_id', 'stock'],
                        where: {
                            branch_id: { [sequelize.Op.like]: `%${branch_id}%` },
                        },
                        product_id: { [sequelize.Op.like]: `%${product_id}%` },
                        stock: { [sequelize.Op.like]: `%${stock}%` },
                        include: [
                            {
                                model: model.branch,
                                attributes: [['name', 'branchname']],
                                branchname: { [sequelize.Op.like]: `%${branchname}%` }
                            }
                        ]
                    }
                ],
                order: [dataSortby()],
                offset: offset,
                limit: parseInt(size)
            });


            console.log('Ini Data dari getProduct :', getProduct);


            res.status(200).send({
                success: true,
                datanum: getProduct.count,
                limit: parseInt(size),
                totalPages: Math.ceil(getProduct.count / size),
                data: getProduct.rows
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    // ------------------- PRODUCT MANAGEMENT ALL PRODUCT -------------------------- //
    getAllProducts: async (req, res, next) => {
        try {
            let { page, size, sortby, order, branch_id, name, category } = req.query;
            if (!page) {
                page = 0;
            }
            if (!size) {
                size = 8;
            }
            if (!sortby) {
                sortby = "name"
            }
            if (!order) {
                order = "ASC"
            }


            let getProducts = await model.product.findAndCountAll({
                where: {
                    name: {
                        [sequelize.Op.like]: `%${name}%`
                    }
                },
                include: [
                    {
                        model: model.categories,
                        attributes: ["category"],
                        where: {
                            category: {
                                [sequelize.Op.like]: `%${category}%`,
                            },
                        }
                    },
                    {
                        model: model.stockbranch,
                        attributes: ["product_id", "branch_id", "stock"],
                        where: {
                            branch_id: {
                                [sequelize.Op.like]: `%${branch_id}%`,
                            },
                        },
                        include: [
                            {
                                model: model.branch,
                                attributes: ['name']
                            },
                        ]
                    },
                ],
                order: [[sortby, order]],
                limit: parseInt(size),
                offset: parseInt(page * size)
            });
            console.log("get all products :", getProducts)

            const formattedProducts = getProducts.rows.map(product => {
                const formattedPrice = formatCurrency(parseFloat(product.price));
                return { ...product.toJSON(), price: formattedPrice };
            });

            const totalPages = Math.ceil(getProducts.count / size);

            return res.status(200).send({
                success: true,
                message: 'have all product',
                data: formattedProducts,
                totalPages: Math.ceil(getProducts.count / size),
                datanum: getProducts.count
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // ---------------------------------- PRODUCT MANAGEMENT ADD PRODUCT -------------------------------------------------- //
    addProduct: async (req, res, next) => {
        try {
            console.log("ini req.body :", req.body);
            console.log("req.files  : ", req.files);

            const { name, price, description, category_id, stock, branch_id, before, after, type } = JSON.parse(req.body.data);

            const parsedPrice = parseFloat(price);
            const formattedPrice = formatCurrency(parsedPrice);

            if (!req.files || req.files.length === 0) {
                return res.status(500).send({
                    success: false,
                    message: 'Add Product fail'
                })
            } else {
                const tambah = await model.product.create({
                    uuid: uuidv4(),
                    name,
                    price: parsedPrice,
                    image: `/imgProduct/${req.files[0]?.filename}`,
                    description,
                    category_id
                });


                console.log("ini hasil tambah :", tambah);

                const product_id = tambah.id;
                const newStock = await model.stockbranch.create({
                    stock,
                    branch_id,
                    product_id,
                    isEnable: 0

                });
                console.log("ini hasil stockBranch :", newStock);

                const historyStock = await model.historystockproduct.create({
                    product_id,
                    type: "Add",
                    before,
                    after,
                });
                console.log("ini hasil history stock product:", historyStock);
            }

            return res.status(200).send({
                success: true,
                message: 'Add Product Success',
            })

        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: 'Add Product fail: Internal server error'
            });
        }
    },
    // --------------- PRODUCT MANAGEMENT DELETE PRODUCT -------------------- //
    deleteProduct: async (req, res, next) => {
        try {
            console.log(`req.params`, req.params);
            let findProduct = await model.product.findAll({
                where: {
                    uuid: req.params.uuid
                },
            });
            // console.log(findProduct);
            if (findProduct[0].dataValues.isDeleted == false) {
                let deleteProduct = await model.product.update(
                    { isDeleted: 1 },
                    {
                        where: {
                            uuid: req.params.uuid
                        },
                    }
                );
                console.log(`deleteProduct`, deleteProduct);

                let deleteStock = await model.stockbranch.update(
                    { isDeleted: 1 },
                    {
                        where: {
                            product_id: findProduct[0].dataValues.id
                        },
                    }
                );
                console.log(`deleteStockBranch`, deleteStock);

                res.status(200).send({
                    success: true,
                    message: "product deleted",
                });
            } else {
                let deleteProduct = await model.product.update(
                    { isDeleted: 0 },
                    {
                        where: {
                            uuid: req.params.uuid
                        },
                    }
                );
                console.log(`deleteProduct`, deleteProduct);

                let deleteStock = await model.stockbranch.update(
                    { isDeleted: 0 },
                    {
                        where: {
                            product_id: findProduct[0].dataValues.id
                        },
                    }
                );
                console.log(`deleteStockBranch`, deleteStock);

                res.status(200).send({
                    success: true,
                    message: "product undelete",
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // --------------------------------------- PRODUCT MANAGEMENT EDIT PRODUCT ------------------------------------------ //
    editProduct: async (req, res, next) => {
        try {
            const { name, price, description, category, image, stock, branch_id, before, after } = JSON.parse(req.body.data);

            const parsedPrice = parseFloat(price);
            const formattedPrice = formatCurrency(parsedPrice);

            const get = await model.product.findAll({
                where: { uuid: req.params.uuid },
                attributes: ['image']
            });

            const product = await model.product.findOne({
                where: { uuid: req.params.uuid },
                attributes: ['price']
            });

            const updateData = {};

            if (name) {
                updateData.name = name;
            }
            if (price) {
                updateData.price = parsedPrice;
            }
            if (description) {
                updateData.description = description;
            }
            if (category) {
                updateData.category_id = category;
            }
            if (req.files.length > 0 || image) {
                updateData.image = image || `/imgProduct/${req.files[0]?.filename}`;
            }

            const edit = await model.product.update(updateData, {
                where: {
                    uuid: req.params.uuid
                }
            });

            console.log("ini Edit : ", edit);

            if (fs.existsSync(`./src/public${get[0].dataValues.image}`) && !get[0].dataValues.image.includes('default')) {
                fs.unlinkSync(`./src/public${get[0].dataValues.image}`);
            }

            console.log("req.files gambar  : ", req.files);

            const productData = await model.product.findOne({
                where: {
                    uuid: req.params.uuid
                },
                attributes: ['id']
            });

            if (stock) {
                const updateStock = await model.stockbranch.update(
                    {
                        stock,
                        branch_id
                    },
                    {
                        where: {
                            product_id: productData.id
                        }
                    }
                );

                console.log("Update Stock: ", updateStock);

                const updateHistoryStock = await model.historystockproduct.update(
                    {
                        type: "Update",
                        before,
                        after: parseInt(after),
                    },
                    {
                        where: {
                            product_id: productData.id
                        }
                    }
                );
                console.log("Update Stock: ", updateHistoryStock);
            }

            return res.status(200).send({
                success: true,
                message: "Edit Product Success",
                price: formattedPrice
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Failed to edit product. Unable to update product."
            });
        }
    },
    //------------------- HISTORY STOCK PRODUCT --------------------------------- //
  getHistoryStock: async (req, res, next) => {
    try {
      let { page, size, sortby, order, name, branch_id} = req.query;
      if (!page) {
        page = 0;
      }
      if (!size) {
        size = 8;
      }
      if (!sortby) {
        sortby = "name"
      }
      if (!order) {
        order = "ASC"
      }
      

      let getAllHistoryStock = await model.product.findAndCountAll({
        where: {
          name: {
            [sequelize.Op.like]: `%${name}%`
          }
        },
        include: [
          {
            model: model.stockbranch,
            attributes: ["branch_id"],
            where: {
                branch_id: {
                    [sequelize.Op.like]: `%${branch_id}%`,
                },
            },
            include: [
              {
                model: model.branch,
                attributes: ['name']
              },
            ]
          },
          {
            model: model.historystockproduct,
            attributes: ["product_id", "before", "after", "type"],
          }
        ],
        order: [[sortby, order]],
        limit: parseInt(size),
        offset: parseInt(page * size)
      });
      console.log("get all history stock product :", getAllHistoryStock)
      
      const totalPages = Math.ceil(getAllHistoryStock.count / size);

      return res.status(200).send({
        success: true,
        message: 'have all product',
        data: getAllHistoryStock.rows,
        totalPages: Math.ceil(getAllHistoryStock.count / size),
        datanum: getAllHistoryStock.count
      })
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};