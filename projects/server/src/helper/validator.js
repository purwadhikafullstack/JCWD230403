const { check, validationResult } = require('express-validator');

module.exports = {
    checkUser: async (req, res, next) => {
        try {
            console.log('Request path :', req.path);
            if (req.path == '/register') {
                await check("name")
                .notEmpty()
                .withMessage('Name field cannot be empty')
                .isLength({max: 100})
                .isAlphanumeric()
                .run(req);
                
                await check("email")
                .notEmpty()
                .isEmail()
                .withMessage('Please provide a valid email address')
                .run(req);
                
                await check("phone")
                .notEmpty()
                .isMobilePhone()
                .withMessage('Please provide a valid phone number')
                .run(req);

                await check("password").notEmpty()
                .isStrongPassword({
                    minLength:6,
                    minLowercase:1,
                    minUppercase:1,
                    minNumbers:1,
                    minSymbols:0
                }).withMessage('Your password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number. Please ensure that your password meets requirements')
                .run(req);
            } else if (req.path == '/auth') {
                await check ("email")
                .notEmpty()
                .isEmail()
                .withMessage('Please provide a valid email address')
                .run(req);

                await check("password").notEmpty()
                .isStrongPassword({
                    minLength:6,
                    minLowercase:1,
                    minUppercase:1,
                    minNumbers:1,
                    minSymbols:0
                }).withMessage('Your password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number. Please ensure that your password meets requirements')
                .run(req);
            } else if (req.path == '/reset') {
                await check("email")
                .notEmpty()
                .isEmail()
                .withMessage('Please provide a valid email address')
                .run(req);
            } else if (req.path == '/new-password') {
                await check("password")
                .notEmpty()
                .isStrongPassword({
                    minLength:6,
                    minLowercase:1,
                    minUppercase:1,
                    minNumbers:1,
                    minSymbols:0
                })
                .withMessage('Your password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number. Please ensure that your password meets requirements')
                .run(req);

                await check("confirmationPassword")
                .notEmpty()
                .isStrongPassword({
                    minLength:6,
                    minLowercase:1,
                    minUppercase:1,
                    minNumbers:1,
                    minSymbols:0
                })
                .withMessage('Your password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number. Please ensure that your password meets requirements')
                .run(req);
            } else if (req.path == '/change') {
                await check("oldPassword")
                .notEmpty()
                .isStrongPassword({
                    minLength:6,
                    minLowercase:1,
                    minUppercase:1,
                    minNumbers:1,
                    minSymbols:0
                })
                .withMessage('Your password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number. Please ensure that your password meets requirements')
                .run(req);

                await check("newPassword")
                .notEmpty()
                .isStrongPassword({
                    minLength:6,
                    minLowercase:1,
                    minUppercase:1,
                    minNumbers:1,
                    minSymbols:0
                })
                .withMessage('Your password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number. Please ensure that your password meets requirements')
                .custom((value, {req}) => {
                    if (value === req.body.oldPassword) {
                        throw('Your new password cannot be the same as your old password. ❌')
                    }
                })
                .run(req);

                await check("confirmNewPassword")
                .notEmpty()
                .isStrongPassword({
                    minLength:6,
                    minLowercase:1,
                    minUppercase:1,
                    minNumbers:1,
                    minSymbols:0
                })
                .withMessage('Your password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number. Please ensure that your password meets requirements')
                .run(req);
            }

            const validation = validationResult(req);
            console.log("Validation result :", validation);
            if(validation.isEmpty()) {
                next();
            } else {
                return res.status(400).send({
                    success: false,
                    message: validation.errors[0].msg,
                    error: validation.errors
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}