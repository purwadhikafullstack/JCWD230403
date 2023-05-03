const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const { login, keeplogin } = require('../Controllers/adminController');
const {readToken} = require('../helper/jwt');
const {checkUser} = require('../helper/validator');

route.post('/auth', checkUser, login);
route.get('/keeplogin', readToken, keeplogin);

module.exports = route