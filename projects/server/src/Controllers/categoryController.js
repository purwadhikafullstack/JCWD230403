const sequelize = require('sequelize');
const model = require ('../models');
const fs = require("fs");


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
            const { category } = JSON.parse(req.body.data);
    
            let tambahCategory = await model.categories.findAll({
                where: {
                    category
                }
            });
    
            console.log("add category", tambahCategory);
    
            if (tambahCategory.length == 0) {
                let addCategory = await model.categories.create({
                    category,
                    imageCategory: `/imgCategory/${req.files[0]?.filename}`
                });
    
                return res.status(200).send({
                    success: true,
                    message: "Add category success",
                    data: addCategory
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: "Category Name Already Exists"
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            console.log(`req.params`, req.params);
            let findCategory = await model.categories.findAll({
                where: {
                    id: req.params.id
                },
            });
            console.log("ini find category management :", findCategory);
            if (findCategory[0].dataValues.isDeleted == false) {
                let deleteCategory = await model.categories.update(
                    { isDeleted: 1 },
                    {
                        where: {
                            id: req.params.id
                        },
                    }
                );
                console.log(`deleteProduct`, deleteCategory);

                res.status(200).send({
                    success: true,
                    message: "product deleted",
                });
            } else {
                let deleteCategory = await model.categories.update(
                    { isDeleted: 0 },
                    {
                        where: {
                            id: req.params.id
                        },
                    }
                );
                console.log(`deleteProduct`, deleteCategory);

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
    editCategory: async (req, res, next) => {
        try {
          console.log("ini dari req.params :", req.params.id);
      
          let cekCategory = await model.categories.findOne({
            where: {
              id: req.params.id,
            },
          });
      
          console.log("ini cekCategory :", cekCategory);
          if (cekCategory) {
            const { category } = JSON.parse(req.body.data);
            if (!category) {
              return res.status(400).send({
                success: false,
                message: "Category name cannot be empty",
              });
            }
      
            let sameName = await model.categories.findOne({
              where: {
                category,
                id: {
                  [sequelize.Op.ne]: req.params.id,
                },
              },
            });
      
            if (sameName) {
              return res.status(409).send({
                success: false,
                message: "Category name already exists",
              });
            }
      
            let imageCategory = cekCategory.imageCategory;
      
            if (req.files && req.files.length > 0 && req.files[0]) {
              // If there are new image files, update the imageCategory field
              imageCategory = `/imgCategory/${req.files[0].filename}`;
      
              if (fs.existsSync(`./src/public${cekCategory.imageCategory}`) && !cekCategory.imageCategory.includes('default')) {
                fs.unlinkSync(`./src/public${cekCategory.imageCategory}`);
              }
            }
      
            let editCategory = await model.categories.update(
              {
                category,
                imageCategory,
              },
              {
                where: {
                  id: req.params.id,
                },
              }
            );
            console.log("ini edit category dari management category :", editCategory);
      
            return res.status(200).send({
              success: true,
              message: "Edit Category Success",
            });
          } else {
            return res.status(409).send({
              success: false,
              message: "Category Not found",
            });
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
    // --- get category branch
    getCategortBranch: async (req, res, next) => {
        try {
            let {
                branch_id,
            } = req.query

            let getCategory = await model.categories.findAll({
                attributes: ['id', 'category', 'imageCategory'],
                include: [
                    {
                        model: model.product,
                        attributes: ['id', 'name', 'category_id'],
                        include : [
                            {
                                model: model.stockBranch,
                                attributes: ['branch_id', 'product_id'],
                                where: {
                                    branch_id: { [sequelize.Op.like]: `%${branch_id}%` }
                                },
                                include: [
                                    {
                                        model: model.branch,
                                        attributes: ['city'],
                                    }
                                ]
                            }
                        ]
                    }
                ]
                
            });

            // Filter out categories with empty products array
            getCategory = getCategory.filter(category => category.products.length > 0);
            
            console.log('getCategortBranch :', getCategory)
            res.status(200).send({
                success: true,
                message: "Get category branch success ✅",
                data: getCategory
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
}