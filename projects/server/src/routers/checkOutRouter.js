const express = require('express');
const route = express.Router();
const { getChecked } = require('../Controllers/checkOutController');

route.get('/', getChecked)


module.exports = route