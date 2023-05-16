const express = require('express');
const route = express.Router();
const {readToken} = require('../helper/jwt');
const {addToCart, getAllCartItem, getCartById, deleteProduct, deleteAllProduct, checkProduct, checkAllProduct, totalPrice, addQty, decreaseQty, addExistingProduct, getCartProductById} = require('../Controllers/cartController')

route.post('/add', readToken, addToCart);
route.get('/me', readToken, getAllCartItem)
route.get('/:id', getCartById)
route.get('/cartItem/:productId', getCartProductById)

// checked button
route.patch('/check/:id', checkProduct)
route.patch('/checkAll', readToken, checkAllProduct)

// delete button
route.delete('/:id', deleteProduct)
route.delete('/delete/all', readToken, deleteAllProduct)

// add product quantity (in cart)
route.patch('/add/:id', addQty)
route.patch('/decrease/:id', decreaseQty)

// add quantity to existed product in cart
// route.patch('/addexisting/:productId', addExistingProduct)

// total price 
route.get('/price/total', readToken, totalPrice)

module.exports = route