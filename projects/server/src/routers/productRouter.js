const { productController } = require('../Controllers');
const express = require('express');
const route = express.Router();


route.get('/', productController.allProduct);
route.post("/list", productController.list);
route.get('/allstock', productController.allStock);
route.post('/allstock', productController.allStock);
route.get('/allbranch', productController.allBranch);
route.get('/detail/:id', productController.getDetailProduct);
route.get('/productlist', productController.productList);





module.exports = route;