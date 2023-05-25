const express = require('express');
const route = express.Router();
const { getChecked, createTransaction, payment, getTransactionDetails, getAllUserTransaction, customerOrder, oneOrder, myOrder, getDetail, getList, getOrderList } = require('../control/transaction');
const { readToken } = require('../helper/jwt');
const uploader = require('../helper/uploader');

route.get('/', readToken, getChecked)
route.post('/create', readToken ,createTransaction)
route.patch('/payment/:id', readToken, uploader('/payment', 'PAY').array('images', 1), payment)
route.get("/all", readToken, getAllUserTransaction);
// route.get("/details/:uuid", readToken, getTransactionDetails);
route.get('/detail', readToken, getDetail);
route.get('/list', getOrderList );


module.exports = route