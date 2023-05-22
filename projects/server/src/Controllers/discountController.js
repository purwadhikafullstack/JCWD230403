const sequelize = require("sequelize");
const model = require("../models");

module.exports = {
    // --- CREATE DISCOUNT MANUAL --- //
    discountManual: async (req, res, next) => {
        try {
            const {
                nameDiscount, 
                specialPrice,
                // percent, 
                activeDate, 
                endDate, 
                productId,
            } = req.body

            const manualDiscount = await model.discount.create({
                nameDiscount,
                specialPrice,
                activeDate,
                endDate,
                productId,
                isDeleted: 0
            })

            console.log("ini data dari createDiscount", manualDiscount);

            res.status(200).send({
                success: true,
                data: manualDiscount
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // --- DISCOUNT LIST --- //
    discountList: async (req, res, next) => {
        try {

            let {
                page,
                size,
                sortby,
                order,
                nameDiscount,
                product_id,
                stock,
                branch_id,
                branchname,
            } = req.query

            if(!page){
                page = 0;
            }
            if(!size){
                size = 10;
            }
            if(!sortby){
                sortby = 'id';
            }
            if(!order){
                order = 'DESC';
            }
            if(!nameDiscount){
                nameDiscount = '';
            }
            if(!branch_id){
                branch_id= '';
            }
            if (!branchname) {
                branchname=''
            }
            if (!stock) {
                stock = '';
            }

            let offset = parseInt(page * size)
            if(nameDiscount){
                offset = 0;
            }

            const dataSortby = () => {
                if (sortby === 'nameDiscount') {
                    return ['nameDiscount', order]
                } else if (sortby === 'id') {
                    return ['id', order]
                } else {
                    return ['id', order]
                }
            }

            const getDiscount = await model.discount.findAndCountAll({
            attributes: ['id', 'nameDiscount', 'specialPrice', 'activeDate', 'endDate', 'productId', 'isDeleted'],
            where: {
                nameDiscount: {[sequelize.Op.like]: `%${nameDiscount}%`},
                productId: {
                    [sequelize.Op.in]: sequelize.literal(
                      `(SELECT DISTINCT product_id FROM stockBranches WHERE branch_id = ${branch_id})`
                    )
                  }
            },
            include: [
              {
                model: model.product,
                attributes: ['name', 'price'],
                include: [
                  {
                    model: model.stockbranch,
                    attributes: ['product_id', 'branch_id', 'stock'],
                    where: {
                        branch_id: branch_id // filter by branch_id
                    },
                    include: [
                      {
                        model: model.branch,
                        attributes: [['name', 'branchname']]
                      }
                    ]
                  }
                ]
              }
            ],
            order: [dataSortby()],
            offset: offset,
            limit: parseInt(size)
          });

          console.log('branch_id:', branch_id);
        
          console.log("product from getDiscount :", getDiscount.rows.map(row => row.dataValues.product.stockbranch.map(sb => sb.dataValues.branch_id)));
      
          res.status(200).send({
            success: true,
            datanum: getDiscount.count,
            limit: parseInt(size),
            totalPages: Math.ceil(getDiscount.count / size),
            data: getDiscount.rows
          });
        } catch (error) {
          console.log(error);
          next(error);
        }
    },
    // --- DELETE DISCOUNT --- //
    discountManualDelete: async (req, res, next) => {
        try {
            let checkDiscountManual = await model.discount.findAll({
                where: {
                    id: req.params.id
                }
            })
            console.log('Data dari checkDiscountManual', checkDiscountManual);

            if (checkDiscountManual[0].dataValues.isDeleted == false) {
                let discountManualDelete = await model.discount.update({isDeleted: 1}, {
                    where: {
                        id: req.params.id
                    }
                })
                console.log("Discount status enable to disable", discountManualDelete);
                res.status(200).send({
                    success: true,
                    message: "This Discount is now Disable",
                    data: checkDiscountManual
                })
            } else {
                let discountManualDelete = await model.discount.update({isDeleted: 0}, {
                    where: {
                        id: req.params.id
                    }
                })
                console.log("Discount status enable to disable", discountManualDelete);
                res.status(200).send({
                    success: true,
                    message: "This Discount is now Enable",
                    data: checkDiscountManual
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    // --- EDIT DISCOUNT --- //
    discountManualEdit: async (req, res, next) => {
        try {
            let checkDiscountManual = await model.discount.findAll({
                where: {
                    nameDiscount: req.body.nameDiscount,
                    id: {[sequelize.Op.ne]: req.params.id}
                }
            })
            console.log("Data checkDiscountManual EDIT :", checkDiscountManual);

            if (checkDiscountManual.length == 0) {
                const {
                    nameDiscount,
                    specialPrice,
                    activeDate,
                    endDate,
                    productId
                } = req.body;

                let discountManualEdit = await model.discount.update({
                    nameDiscount,
                    specialPrice,
                    activeDate,
                    endDate,
                    productId
                }, {
                    where: {
                        id: req.params.id
                    }
                })

                console.log('ini data dari discountManualEdit', discountManualEdit);

                res.status(200).send({
                    success: true,
                    message: "Discount changed success",
                    data: discountManualEdit
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: "Discount name already exists. Discount change canceled"
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


}