const sequelize = require("sequelize");
const model = require("../models");
const bcrypt = require('bcrypt');
const { createToken } = require('../helper/jwt');
const {v4 : uuidv4} = require('uuid');
const transporter = require('../helper/nodemailer');

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
            // console.log('Check user exist :', checkUser);
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

                    // GENERATE TOKEN
                    let token = createToken({
                        uuid: regis.dataValues.uuid,
                        email: regis.dataValues.email
                    }, '24h');

                    // Mengirimkan email verifikasi
                    await transporter.sendMail({
                        from: "FreshFinds Admin",
                        to: req.body.email,
                        subject: "Account Verification",
                        html:
                        `<div>
                            <h4>Hello, ${name}</h4>
                            <p>
                                Thank you for registering with our platform. To complete the registration process, we need to verify your account. 
                                Please click on the link below to verify your account :
                            </p>
                            <br>
                            <p>
                                <a href="http://localhost:3000/verification/${token}">Verify Account</a>
                            </p>
                            <br/>
                            <p>Best regards,</p>
                            <p>FreshFinds</p>
                        </div>`
                    });

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
    },
    // verify user
    verify: async (req, res, next) => {
        try {
            console.log("Data dari read token :", req.decrypt);
            let checkUser = await model.user.findOne({
                where: {
                    uuid: req.decrypt.uuid,
                    isVerified: true
                }
            });
            if (checkUser) {
                res.status(409).send({
                    success: false,
                    message: "Your account has already been verified ❌"
                })
            } else {
                await model.user.update({
                    isVerified: 1}, 
                    {where: {
                        uuid: req.decrypt.uuid
                    }})
                res.status(200).send({
                    success: true,
                    message: "Account successfully verified ✅"
                })
            }
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // Forget password
    forget: async(req, res, next) => {
        try {
            let checkUser = await model.user.findAll({
                where: {
                    email: req.body.email
                }
            });
            const name = checkUser[0].dataValues.name;
            console.log(name);
            if(checkUser.length == 0){
                return res.status(404).send({
                    success: false,
                    message: "Email not found ❌"
                })
            }
            // Generate token
            let token = createToken({
                uuid: checkUser[0].dataValues.uuid,
                email: checkUser[0].dataValues.email
            }, '24h');
    
            // Mengirimkan email reset password
            await transporter.sendMail({
                from: "FreshFinds Admin",
                to: req.body.email,
                subject: "Reset Password",
                html:
                `<div>
                    <h4>Hello, ${name}</h4>
                    <p>
                        Forgot your password ?
                    </p>
                    <p>
                        We received a request to reset the password for your account.
                    </p>
                    <br/>
                    <p>
                        To reset your password, click on the link below:
                    </p>
                    <br/>
                    <p>
                        <a href="http://localhost:3000/reset/${token}">Reset password</a>
                    </p>
                    <br/>
                    <p>Best regards,</p>
                    <p>FreshFinds</p>
                </div>`
            });
            return res.status(200).send({
                success: true,
                message: "An email for resetting your password has been sent. Please check your email"
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // Reset password
    reset: async (req, res, next) => {
        try {
            if(req.body.password !== req.body.confirmationPassword){
                return res.status(400).send({
                    success: false,
                    message: "Password and confirmation password do not match ❌"
                })
            }
            newPassword = bcrypt.hashSync(req.body.password, salt);
            await model.user.update({
                password: newPassword}, 
                { where: {
                    uuid: req.decrypt.uuid
                }
            })
            return res.status(200).send({
                success: true,
                message: "Password changed ✅"
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}