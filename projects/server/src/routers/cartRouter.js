const express = require('express');
const route = express.Router();
const {readToken} = require('../helper/jwt');
const {addToCart} = require('../Controllers/cartController')

route.post('/add', readToken, addToCart)

module.exports = route