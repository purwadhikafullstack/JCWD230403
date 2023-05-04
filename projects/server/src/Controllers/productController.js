const sequelize = require('sequelize');
const model = require('../models');




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
    allStock: async (req, res, next) => {
        try {
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
                        model: model.stockBranch,
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
                            // get[0].datavalue.name = get[0].dataValues.branch.name
                        ]
                    },
                ],
                attributes: ["name", "price", "image"],
                order: [[sortby, order]],
                limit: parseInt(size),
                offset: offset
            })

            // console.log("Data dari get :", get[0].dataValues);
            // console.log("Data dari get :", get[0].dataValues.price);
            // console.log("Data dari get category :", get[0].dataValues.category.dataValues.category);
            // console.log("Data dari get branch :", get[0].dataValues.stockBranches[0].dataValues.branch.dataValues.name);


            // res.status(200).send(get);


            if (get.rows.length === 0) {
                return res.status(404).send({
                    message: 'No data found'
                });
            }
            return res.status(200).send({
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
                        model: model.stockBranch,
                        // where: {
                        //     stock: stock
                        // }
                        attributes:['stock']
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
                branchname=''
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
                    return [model.stockBranch, 'stock', order];
                } else if (sortby === 'branchname') {
                    return [{model: model.stockBranch, include: [model.branch]}, model.branch, 'name', order]
                }
              };

            let getProduct = await model.product.findAndCountAll({
                attributes: ['name', 'price', 'category_id', 'stockBranchId'],
                where: {
                    name: {[sequelize.Op.like]: `%${name}%`},
                },
                include: [
                    {
                        model: model.categories, 
                        attributes: ['category'],
                        category: {[sequelize.Op.like]: `%${category}%`}
                    },
                    {
                        model: model.stockBranch,
                        attributes: ['product_id', 'branch_id', 'stock'],
                        where: {
                            branch_id: {[sequelize.Op.like]: `%${branch_id}%`},
                        },
                        product_id: {[sequelize.Op.like]: `%${product_id}%`},
                        stock: {[sequelize.Op.like]: `%${stock}%`},
                        include: [
                            {
                                model: model.branch,
                                attributes: [['name', 'branchname']],
                                branchname: {[sequelize.Op.like]: `%${branchname}%`}
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
    }
};