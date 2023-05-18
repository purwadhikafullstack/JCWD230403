const route = require('express').Router();
const { addressList } = require('../Controllers/addressController');

route.get('/addresslist', addressList);

module.exports = route