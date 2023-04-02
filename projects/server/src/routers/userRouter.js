const route = require('express').Router();
const { register, login, keepLogin, verify, forget, reset } = require('../controllers/userController');
const {readToken} = require('../helper/jwt');
const {checkUser} = require('../helper/validator');

route.post('/register', checkUser, register);
route.post('/auth', checkUser, login);
route.get('/keeplogin', readToken ,keepLogin);
route.patch('/verify', readToken, verify);
route.post('/forgot', forget);
route.patch('/new-password', readToken, reset);

module.exports = route