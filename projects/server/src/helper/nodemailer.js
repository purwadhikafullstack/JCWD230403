const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'gummball03@gmail.com',
        pass:'jhymdoqorftkjvzd'
    }
})

module.exports = transporter;