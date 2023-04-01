const route = require('express').Router();
const { register, login, keepLogin, verify } = require('../controllers/userController');
const {readToken} = require('../helper/jwt');
const {checkUser} = require('../helper/validator');

route.post('/register', checkUser, register);
route.post('/auth', checkUser, login);
route.get('/keeplogin', readToken ,keepLogin);
route.patch('/verify', readToken, verify);

module.exports = route