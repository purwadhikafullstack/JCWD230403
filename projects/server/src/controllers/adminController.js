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
            let getAdmin = await model.admin.findAll({
                where: {
                    email: req.body.email},
                    include: [{model: model.role, attributes: ['role']}]
            })
            if (getAdmin.length > 0) {
                let check = bcrypt.compareSync(req.body.password, getAdmin[0].dataValues.password);

                if (check) {
                    getAdmin[0].dataValues.role = getAdmin[0].dataValues.role.role;
                    let { id, uuid, name, email, password, isSuper, roleId} = getAdmin[0].dataValues;
                    // GENERATE TOKEN
                    let token = createToken({uuid}, "24h");
                    return res.status(200).send({
                        success: true,
                        message: "Login Success ✅",
                        name: name,
                        email: email,
                        password: password,
                        isSuper: isSuper,
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
    keeplogin: async (req, res, next) => {
        try {
            console.log("Decrypt token :", req.decrypt);
            let getAdmin = await model.admin.findAll({
                where: {
                    uuid: req.decrypt.uuid
                },
                include: [{model: model.role, attributes: ['role']}]
            });

            getAdmin[0].dataValues.role = getAdmin[0].dataValues.role.role;
            let { id, uuid, name, email, password, isSuper, roleId} = getAdmin[0].dataValues;
            // GENERATE TOKEN
            let token = createToken({uuid}, "24h");
            return res.status(200).send({
                success: true,
                message: "Keep login Success ✅",
                name: name,
                email: email,
                password: password,
                isSuper: isSuper,
                roleId: roleId,
                token: token
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

}