const route = require('express').Router();
const { register } = require('../controllers/userController');
const {readToken} = require('../helper/jwt');
const {checkUser} = require('../helper/validator');

route.post('/register', checkUser, register);

module.exports = route