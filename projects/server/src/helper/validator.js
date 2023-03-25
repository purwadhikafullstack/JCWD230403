const { check, validationResult } = require('express-validator');

module.exports = {
    checkUser: async (req, res, next) => {
        try {
            console.log('Request path :', req.path);
            if (req.path == '/regis') {
                await check("name").notEmpty().isAlphanumeric().withMessage('Please provide a valid name/Name field cannot be empty').run(req);
                await check("email").notEmpty().isEmail().withMessage('Please provide a valid email address/The email field cannot be empty').run(req);
                await check("phone").notEmpty().isMobilePhone().withMessage('Please provide a valid phone number/The phone field cannot be empty').run(req);
            } else if (req.path == '/auth') {
                await check ("email").notEmpty().isEmail().run(req);
            } 
            await check("password").notEmpty().isStrongPassword({
                minLength:6,
                minLowercase:1,
                minUppercase:1,
                minNumbers:1,
                minSymbols:0
            }).withMessage('Your password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number. Please ensure that your password meets requirements')
            .run(req);

            const validation = validationResult(req);
            console.log("Validation result :", validation);
            if(validation.isEmpty()) {
                next();
            } else {
                return res.status(400).send({
                    success: false,
                    message: 'Validation invalid',
                    error: validation
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}