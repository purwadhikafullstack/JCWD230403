const sequelize = require('sequelize');
const model = require ('../models');


module.exports = {
    getAllCategory: async (req, res, next) => {
        try {
            let { page, size, sortby, order } = req.query;
            if (!page) {
                page = 0;
            }
            // if (!size) {
            //     size = 8;
            // }
            if (!sortby) {
                sortby = "category"
            }
            if (!order) {
                order = "ASC"
            }
            
            let getCategory = await model.categories.findAndCountAll({
                where: {
                    isDeleted: false
                },
                order: [[sortby, order]],
                limit: parseInt(size) || null,
                offset: parseInt(page * size) || 0
            });



            console.log("get all category :", getCategory);
            
            const totalPages = Math.ceil(getCategory.count / size); // total number of pages

            
            return res.status(200).send({
                success: true, 
                message: 'have all category',
                data: getCategory.rows,
                totalPages: Math.ceil(getCategory.count / size),
                datanum: getCategory.count
                
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    addCategory: async (req, res, next) => {
        try {
            let tambahCategory = await model.categories.findAll({
                where: {

                    category: req.body.category
                }
            })
            console.log("add category", tambahCategory);

            if (tambahCategory.length == 0) {

                let addCategory = await model.categories.create({
                    category: req.body.category
                })
                return res.status(200).send({
                    success: true,
                    message: "Add category success",
                    data: addCategory 
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: "Category Name Already Exists"
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            let hapusCategory = await model.categories.update({
                isDeleted: true
            }, {
                where: {
                    id: req.params.id
                }
            });

            console.log("deletecategory :", hapusCategory);
            
            res.status(200).send({
                success: true,
                message: 'Delete Success',
                data: hapusCategory,
            })
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    editCategory: async (req, res, next) => {
        try {
            console.log("ini dari req.params :", req.params.id)
            let cekCategory = await model.categories.findOne({
            }, {
                where: {
                    // category: req.body.category,
                    id: req.params.id 
                }
            });

            console.log("ini cekCategory :", cekCategory)
            if (cekCategory) {
                let newCategory = req.body.category;
                if (!newCategory) {
                    return res.status(400).send({
                        success: false,
                        message: "Category name cannot be empty"
                    })
                }
                let sameName = await model.categories.findOne({
                    where: {
                        category: newCategory,
                        id: {
                            [sequelize.Op.ne]: req.params.id
                        }
                    }
                })
                if (sameName) {
                    return res.status(409).send({
                        success: false,
                        message: "Category name already exists"
                    })
                }
                await model.categories.update({
                    category: req.body.category
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                // console.log("ini editCategory :", editCategory)

                return res.status(200).send({
                    success: true,
                    message: "Edit Category Success",
                })
            } else {
                return res.status(409).send({
                    success: false,
                    message: "Category Not found"
                })
            }

        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    undeleteCategory: async (req, res, next) => {
        try {
            const undeleteCategory = await model.categories.findOne({
                isDeleted: true
            }, {
                where: {
                    id: req.params.id
                }
            });
            if (!undeleteCategory) {
                return res.status(400).send({
                    success: false,
                    message: "Category not found or already undeleted"
                });
            }
            await model.categories.update({
                isDeleted:false
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200).send({
                success: true,
                message: "Category undeleted successfully",
                data: undeleteCategory
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    listundeleteCategory: async (req, res, next) => {
        try {
            const listDelete = await model.categories.findAll({
                where: {
                    isDeleted: true
                }
            });
            return res.status(200).send({
                success: true,
                message: "Deleted list Categories success get",
                data: listDelete
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
}