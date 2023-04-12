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
    getDetailProduct: async (req, res) => {
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
                        where: {
                            stock: stockQty
                        }
                    }
                ]
            })

            res.status(200).send({
                message: 'get product by id',
                data: getProductDetail
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
};