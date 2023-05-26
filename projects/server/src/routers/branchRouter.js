const route = require('express').Router();
const { branchList } = require('../control/branchController');
const {readToken} = require('../helper/jwt');

route.get('/branchlist', readToken, branchList);

module.exports = route