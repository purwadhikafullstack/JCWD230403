const route = require('express').Router();
const { addressList, userAddress } = require('../control/addressController');
const { readToken } = require('../helper/jwt');

route.get('/addresslist', addressList);
route.get('/useraddress', readToken, userAddress);

module.exports = route