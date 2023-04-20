const route = require('express').Router();
const { register, login, keepLogin, verify, forget, reset, change } = require('../Controllers/userController');
const {readToken} = require('../helper/jwt');
const {checkUser} = require('../helper/validator');

route.post('/register', checkUser, register);
route.post('/auth', checkUser, login);
route.get('/keeplogin', readToken ,keepLogin);
route.patch('/verify', readToken, verify);
route.post('/forgot', checkUser, forget);
route.patch('/new-password', readToken, checkUser, reset);
route.patch('/change', readToken, change);

module.exports = route