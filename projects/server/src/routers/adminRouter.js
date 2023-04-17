const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const { login, keeplogin, adminRegister, adminList, adminEdit, adminDelete, adminReset } = require('../Controllers/adminController');
const {readToken} = require('../helper/jwt');
const {checkUser} = require('../helper/validator');

route.post('/auth', checkUser, login);
route.get('/keeplogin', readToken, keeplogin);
route.post('/adminregister', checkUser, readToken, adminRegister);
route.get('/adminlist', readToken, adminList);
route.patch('/adminedit/:uuid', readToken, adminEdit);
route.patch('/admindelete/:uuid', readToken, adminDelete);
route.patch('/adminreset/:uuid', readToken, adminReset);

module.exports = route