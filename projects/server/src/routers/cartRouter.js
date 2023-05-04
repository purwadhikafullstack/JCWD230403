const express = require('express');
const route = express.Router();
const {readToken} = require('../helper/jwt');
const {addToCart, getAllCartItem} = require('../Controllers/cartController')

route.post('/add', readToken, addToCart);
route.get('/me', readToken, getAllCartItem)

module.exports = route