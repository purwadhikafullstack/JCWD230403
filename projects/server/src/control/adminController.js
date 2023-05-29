const sequelize = require("sequelize");
const model = require("../models");
const bcrypt = require('bcrypt');
const {createToken} = require('../helper/jwt');
const {v4 : uuidv4} = require('uuid');

let salt = bcrypt.genSaltSync(10);

module.exports = {
    // login as an admin
    login: async (req, res, next) => {
        try {
            let getAdmin = await model.user.findAll({
                where: {
                    email: req.body.email
                }
            });
            // check email
            if (getAdmin.length > 0) {
                // check isDeleted
                if (getAdmin[0].dataValues.isDeleted == false) {
                    // check roleId 
                    if (getAdmin[0].dataValues.roleId === 1 || getAdmin[0].dataValues.roleId === 2) {
                        let check = bcrypt.compareSync(req.body.password, getAdmin[0].dataValues.password);
                        // check password
                        if(check) {
                            let { id, uuid, name, email, roleId, branchId, role } = getAdmin[0].dataValues;

                            // GENERATE TOKEN
                            let token = createToken({ uuid, roleId }, "24h");

                            return res.status(200).send({
                              success: true,
                              message: "Login Success",
                              name: name,
                              email: email,
                              roleId: roleId,
                              branchId: branchId,
                              token: token,
                              role
                            });
                        } else {
                            return res.status(400).send({
                                success: false,
                                message: "Login failed: password is wrong"
                              });
                        }
                    } else {
                        return res.status(400).send({
                            success: false,
                            message: "You're not an admin"
                          });
                    }
                } else {
                    return res.status(400).send({
                        success: false,
                        message: "Your account is inactive. Please contact admin for further information"
                    });
                }
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Email not found"
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // keep login as admin
    keeplogin: async (req, res, next) => {
        try {
            console.log("Decrypt token :", req.decrypt);
            let getAdmin = await model.user.findAll({
                where: {
                    uuid: req.decrypt.uuid
                },
                include: [{model: model.role, attributes: ['role']}]
            });

            getAdmin[0].dataValues.role = getAdmin[0].dataValues.role.role;
            let { id, uuid, name, email, password, roleId, branchId} = getAdmin[0].dataValues;
            // GENERATE TOKEN
            let token = createToken({uuid, roleId}, "24h");
            return res.status(200).send({
                success: true,
                message: "Keep login Success",
                name: name,
                email: email,
                // password: password,
                roleId: roleId,
                branchId: branchId,
                token: token
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    // Admin List
    adminList: async (req, res, next) => {
        try {
            let {
                page,
                size,
                sortby,
                order,
                name
            } = req.query
            
            if (!page) {
                page = 0;
            }
            if (!size) {
                size = 10;
            }
            if (!sortby) {
                sortby = 'name';
            }
            if (!order) {
                order = 'ASC'
            }
            if (!name) {
                name = '';
            }

            let offset = parseInt(page * size);
            if (name) {
                offset = 0;
            }

            const dataSortby = () => {
                if (sortby === 'name') {
                    return ['name', order]
                } else if (sortby === 'role') {
                    return [[{model: model.role, attributes: ['role']}, 'role', order]]
                } else if (sortby === 'branchname') {
                    return [[{model: model.branch, attributes: ['name']}, 'name', order]]
                }
            }

            let getAdmin = await model.user.findAndCountAll({
                attributes: ['uuid', 'name', 'email', 'phone', 'roleId', 'branchId', 'isDeleted'],
                where:{
                    roleId: {[sequelize.Op.in]: [1, 2]},
                    name: {[sequelize.Op.like]: `%${name}%`}
                },
                include: [{
                    model: model.role,
                    attributes: ['role']
                },
                {
                    model: model.branch,
                    attributes: ['city']
                }],
                order: [dataSortby()],
                offset: offset,
                limit: parseInt(size)
            })
            console.log("ini data dari getAdmin", getAdmin);
            res.status(200).send({
                success: true,
                datanum: getAdmin.count,
                limit: parseInt(size),
                totalPage: Math.ceil(getAdmin.count / size),
                data: getAdmin.rows
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // Admin Register
    adminRegister: async (req, res, next) => {
        const ormTransaction = await model.sequelize.transaction();
        try {
            let checkAdmin = await model.user.findAll({
                where: {
                    email: req.body.email
                }
            })
            // here the condition to check all form all fill
            if (checkAdmin.length == 0) {
                if (req.body.password == req.body.confirmationPassword){
                    delete req.body.confirmationPassword;

                    req.body.password = bcrypt.hashSync(req.body.password, salt);
                    const uuid = uuidv4();
                    const {name, email, password, phone, roleId, branchId} = req.body;
                    
                    let regis = await model.user.create({
                        uuid, 
                        name, 
                        email, 
                        password,
                        phone,
                        isVerified: 1,
                        profileId: null,
                        addressId: null,
                        roleId,
                        branchId,
                        isDeleted: 0
                    });
                    await ormTransaction.commit();
                    return res.status(200).send({
                        success: true,
                        message: "Create new admin Success",
                        data: regis
                    });
                } else {
                    return res.status(400).send({
                        success: false,
                        message: "The passwords do not match. Please try again." 
                    });
                }
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Email exist, Please enter a different email address."
                });
            }
        } catch (error) {
            await ormTransaction.rollback();
            console.log(error);
            next(error);
        }
    },
    // Edit Admin
    adminEdit: async (req, res, next) => {
        try {
            let checkAdmin = await model.user.findAll({
                where: {
                    email: req.body.email,
                    uuid: {[sequelize.Op.ne]: req.params.uuid}
                }
            })
            console.log("data checkAdmin", checkAdmin);
            
            if (checkAdmin.length == 0) {
                const {
                    name, 
                    email, 
                    phone, 
                    roleId, 
                    branchId} = req.body;

                let adminEdit = await model.user.update({
                    name,
                    email,
                    phone,
                    roleId,
                    branchId
                }, {
                    where: {
                        uuid: req.params.uuid
                    }
                })

                console.log("Ini data dari adminEdit :", adminEdit);

                res.status(200).send({
                    success: true,
                    message: "Admin changed success",
                    data: adminEdit
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: "Email already exists. Admin change canceled"
                })
            }

        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // Delete Admin
    adminDelete: async (req, res, next) => {
        try {
            let checkAdmin = await model.user.findAll({
                where: {
                    uuid: req.params.uuid
                }
            })
            console.log('Data dari checkAdmin:', checkAdmin);

            if (checkAdmin[0].dataValues.isDeleted == false) {
                let adminDelete = await model.user.update({isDeleted: 1}, {
                    where: {
                        uuid: req.params.uuid
                    }
                })
                // console.log("Admin status inactive to reactive :", adminDelete);
                res.status(200).send({
                    success: true,
                    message: "This account is now inactive"
                })
            } else {
                let admindelete = await model.user.update({isDeleted: 0}, {
                    where: {
                        uuid: req.params.uuid
                    }
                })
                // console.log("Admin status active to inactive :", admindelete);
                res.status(200).send({
                    success: true,
                    message: "This account is now active"
                })
            }

        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // Admin reset password
    adminReset: async (req, res, next) => {
        try {
            let getAdmin = await model.user.findAll({
                where: {
                    // email: req.body.email
                    uuid: req.params.uuid
                }
            })
            console.log("ini data dari adminReset getAdmin :", getAdmin);
            // check uuid
            if (getAdmin.length > 0) {
                // check roleId
                if (getAdmin[0].dataValues.roleId === 1 || getAdmin[0].dataValues.roleId === 2) {
                    if (req.body.password && req.body.confirmationPassword) {
                        if(req.body.password === req.body.confirmationPassword) {
                            newPassword = bcrypt.hashSync(req.body.password, salt);
                            await model.user.update({ password : newPassword}, {
                                where: {
                                    uuid: req.params.uuid
                                }
                            })
                            return res.status(200).send({
                                success: true,
                                message: "Password reset successful!"
                            })   
                        } else {
                            return res.status(400).send({
                                success: false,
                                message: "Password and confirmation password do not match. Please try again."
                            })
                        }
                    } else {
                        return res.status(400).send({
                            success: false,
                            message: "Please fill in all fields."
                          });
                    }
                } else {
                    return res.status(400).send({
                        success: false,
                        message: "The account is not associated with an admin database. Please try again."
                    });
                }
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Account not found."
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // Admin list for Admin Dashboard
    adminBranchList: async (req, res, next) => {
        try {
            const branchId = req.query.branchId
            let branchFilter = {
                roleId: {[sequelize.Op.in]: [1, 2]}
            }
            if (branchId) {
                branchFilter.branchId = branchId
            }
            
            const {page = 1, size = 5 , name, sortby = 'name', order = 'asc'} = req.query

            let offset = parseInt(page * size)
            if (name) {
                offset = 0
            }

            let getAdmin = await model.user.findAndCountAll({
                where: {
                    ...branchFilter,
                    name: { [sequelize.Op.like]: `%${name}%` },
                },
                attributes: ['name', 'branchId', 'isDeleted'],
                include: [{
                    model: model.branch,
                    attributes: ['city']
                }],
                order: [[sortby, order]],
                offset: offset,
                limit: parseInt(size)
            })

            console.log("ini data dari getAdmin :", getAdmin);
            
            return res.status(200).send({
                success: true,
                datanum: getAdmin.count,
                data: getAdmin.rows,
                limit: parseInt(size),
                totalPage: Math.ceil(getAdmin.count / size)

            })
        } catch (error) {
            console.log("ini data dari error :", error);
            next(error)
        }
    }
}