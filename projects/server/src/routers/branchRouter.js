const route = require('express').Router();
const { branchList } = require('../Controllers/branchController');
const {readToken} = require('../helper/jwt');

route.get('/branchlist', readToken, branchList);

module.exports = route