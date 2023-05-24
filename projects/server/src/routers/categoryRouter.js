const { categoryController } = require('../control');
const express = require('express');
const route = express.Router();
const uploader = require("../helper/uploader");
const {readToken} = require('../helper/jwt');



route.get('/allcategory',  readToken, categoryController.getAllCategory);
route.post('/addcategory', readToken, uploader('/imgCategory', 'CTGR').array('images', 1), categoryController.addCategory);
route.patch('/deletecategory/:id', readToken, categoryController.deleteCategory);
route.patch('/editcategory/:id', readToken, uploader('/imgCategory', 'CTGR').array('images', 1), categoryController.editCategory);
// route.get('/categoryproduct/:id', categoryController.getCategoryProduct);
route.get('/categorybranch', categoryController.getCategortBranch);


module.exports = route;