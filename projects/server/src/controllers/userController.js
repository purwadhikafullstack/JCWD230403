const sequelize = require("sequelize");
const model = require("../models");
const bcrypt = require('bcrypt');
const { createToken } = require('../helper/jwt');
const {v4 : uuidv4} = require('uuid');

let salt = bcrypt.genSaltSync(10);

module.exports = {
    // Register as a user
    register: async (req, res, next) => {
        try {
            // console.log("From Request body :", req.body);
            let checkUser = await model.user.findAll({
                where: {
                    [sequelize.Op.or]: [
                        {email: req.body.email}
                    ]
                }
            })
            console.log('Check user exist :', checkUser);
            if (checkUser.length == 0) {
                if (req.body.password == req.body.confirmationPassword) {
                    delete req.body.confirmationPassword;
                    // console.log('Check data before create :', req.body);
                    req.body.password = bcrypt.hashSync(req.body.password, salt);
                    // console.log('check data after hash password :', req.body);
                    const uuid = uuidv4();
                    const { name, email, password, phone} = req.body;
                    let regis = await model.user.create({
                        uuid, name, email, password, phone, 
                    });
                    // console.log("Data Hasil regis :", regis.datavalue);
                    return res.status(200).send({
                        success: true,
                        message: "Register Success ✅",
                        data: regis
                    });
                } else {
                    res.status(400).send({
                        success: false,
                        message: "The passwords do not match. Please try again. ❌"
                    })
                }
            } else {
                res.status(400).send({
                    success: false,
                    message: "Email exist, Please enter a different email address. ❌"
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // login as a user
    login: async (req, res, next) => {
        try {
            let getUser = await model.user.findAll({
                where: {
                    email: req.body.email},
                    include: [{model: model.role, attributes: ['role']}]
            })
            if (getUser.length > 0) {
                let check = bcrypt.compareSync(req.body.password, getUser[0].dataValues.password);
                
                if (check) {
                    getUser[0].dataValues.role = getUser[0].dataValues.role.role;
                    let {id, uuid, name, email, password, isVerified, roleId} = getUser[0].dataValues;
                    // GENERATE TOKEN
                    let token = createToken({uuid}, "24h");
                    res.status(200).send({
                        success: true,
                        message: "Login Success ✅",
                        name: name,
                        email: email,
                        password: password,
                        isVerified: isVerified,
                        roleId: roleId,
                        token: token
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        message: "Login failed email or password wrong ❌"
                    })
                }
            } else {
                res.status(400).send({
                    success: false,
                    message: "Account not found ❌"
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // keep login as user
    keepLogin: async (req, res, next) => {
        try {
            let getUser = await model.user.findAll({
                where: {
                    uuid: req.decrypt.uuid
                },
                include: [{ model: model.role, attributes: ['role']}]
            });

            getUser[0].dataValues.role = getUser[0].dataValues.role.role;
            let { id, uuid, name, email, password, isVerified, roleId} = getUser[0].dataValues;
            // GENERATE TOKEN
            let token = createToken({uuid}, "24h");
            return res.status(200).send({
                success: true,
                message: "keep login ✅",
                name: name,
                email: email,
                password: password,
                isVerified: isVerified,
                roleId: roleId,
                token: token
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}