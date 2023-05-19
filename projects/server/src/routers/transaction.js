const express = require('express');
const route = express.Router();
const { getChecked } = require('../Controllers/transaction');

route.get('/', getChecked)


module.exports = route