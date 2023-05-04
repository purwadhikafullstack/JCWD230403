const { categoryController } = require('../Controllers');
const express = require('express');
const route = express.Router();



route.get('/allcategory', categoryController.getAllCategory);
route.post('/addcategory', categoryController.addCategory);
route.patch('/deletecategory/:id', categoryController.deleteCategory);
route.patch('/editcategory/:id', categoryController.editCategory);



module.exports = route;