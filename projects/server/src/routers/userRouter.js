const route = require('express').Router();
const { register, login, keepLogin } = require('../controllers/userController');
const {readToken} = require('../helper/jwt');
const {checkUser} = require('../helper/validator');

route.post('/register', checkUser, register);
route.post('/auth', checkUser, login);
route.get('/keeplogin', readToken ,keepLogin);

module.exports = route