const express = require('express');
const route = express.Router();
const {readToken} = require('../helper/jwt');
const { discountManual, discountList, discountManualDelete, discountManualEdit } = require('../Controllers/discountController');

route.post('/discountmanual/', readToken, discountManual);
route.get('/discountlist', readToken, discountList);
route.patch('/discountmanualdelete/:id', readToken, discountManualDelete);
route.patch('/discountmanualedit/:id', readToken, discountManualEdit);

module.exports = route;