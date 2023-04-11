const { productController } = require('../controllers');
const express = require('express');
const route = express.Router();


route.get('/', productController.allProduct);
route.post("/list", productController.list);
route.get('/allstock', productController.allStock);
route.post('/allstock', productController.allStock);
route.get('/allbranch', productController.allBranch);





module.exports = route;