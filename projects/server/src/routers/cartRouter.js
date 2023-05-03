const express = require('express');
const route = express.Router();
const {readToken} = require('../helper/jwt');
const {addToCart, getAllCartItem, getCartById, deleteProduct, deleteAllProduct, checkProduct, checkAllProduct, totalPrice} = require('../Controllers/cartController')

route.post('/add', readToken, addToCart);
route.get('/me', readToken, getAllCartItem)
route.get('/:id', getCartById)

// checked button
route.patch('/check/:id', checkProduct)
route.patch('/checkAll', readToken, checkAllProduct)

// total price 
route.get('/total', readToken, totalPrice)

// delete button
route.delete('/:id', deleteProduct);
route.delete('/delete/all', readToken, deleteAllProduct)

module.exports = route