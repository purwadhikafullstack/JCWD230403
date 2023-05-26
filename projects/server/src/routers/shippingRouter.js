const express = require('express');
const route = express.Router();
const {getAddressDistance, getProvince, getCity, insertProvince, insertCity} = require('../control/shippingController')

route.get('/', getAddressDistance)
route.get('/province', getProvince)
route.get('/city', getCity)
route.post('/province/add', insertProvince)
route.post('/city/add', insertCity)

module.exports = route