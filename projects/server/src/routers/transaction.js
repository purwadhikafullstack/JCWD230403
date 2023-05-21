const express = require('express');
const route = express.Router();
const { getChecked, createTransaction } = require('../Controllers/transaction');
const { readToken } = require('../helper/jwt');

route.get('/', readToken, getChecked)
route.post('/create', readToken ,createTransaction)


module.exports = route