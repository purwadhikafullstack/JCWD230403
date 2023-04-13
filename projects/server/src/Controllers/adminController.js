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
                // check roleId 
                if (getAdmin[0].dataValues.roleId === 1 || getAdmin[0].dataValues.roleId === 2) {
                    let check = bcrypt.compareSync(req.body.password, getAdmin[0].dataValues.password);
                    // check password
                    if(check) {
                        let { id, uuid, name, email, roleId, branchId, role } = getAdmin[0].dataValues;

                        // GENERATE TOKEN
                        let token = createToken({ uuid }, "24h");

                        return res.status(200).send({
                          success: true,
                          message: "Login Success ✅",
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
                            message: "Login failed: password is wrong ❌"
                          });
                    }
                } else {
                    return res.status(400).send({
                        success: false,
                        message: "You're not an admin ❌"
                      });
                }
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Email not found ❌"
                  });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // keep login as user
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