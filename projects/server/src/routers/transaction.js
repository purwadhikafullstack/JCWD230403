const express = require('express');
const route = express.Router();
const { getChecked, createTransaction, getCurrentTransaction, payment } = require('../Controllers/transaction');
const { readToken } = require('../helper/jwt');
const uploader = require('../helper/uploader');

route.get('/', readToken, getChecked)
route.post('/create', readToken ,createTransaction)
// route.get('/detail/:id', readToken, getCurrentTransaction)
route.patch('/payment', 
readToken, 
// uploader('/payment', 'PAY').array('images', 1), 
payment)


module.exports = route