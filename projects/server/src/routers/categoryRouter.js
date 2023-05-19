const { categoryController } = require('../Controllers');
const express = require('express');
const route = express.Router();
const {readToken} = require('../helper/jwt');



route.get('/allcategory',  readToken, categoryController.getAllCategory);
route.post('/addcategory', categoryController.addCategory);
route.patch('/deletecategory/:id', categoryController.deleteCategory);
route.patch('/editcategory/:id', categoryController.editCategory);



module.exports = route;