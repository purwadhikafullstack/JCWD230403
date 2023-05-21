const express = require('express');
const route = express.Router();
const { getChecked, createTransaction } = require('../Controllers/transaction');
const { readToken } = require('../helper/jwt');
const uploader = require('../helper/uploader');

route.get('/', readToken, getChecked)
route.post('/create', readToken ,createTransaction)
// route.patch('/payment', readToken, uploader)


module.exports = route