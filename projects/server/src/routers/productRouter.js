const { productController } = require('../Controllers');
const express = require('express');
const route = express.Router();
const uploader = require("../helper/uploader");
const {readToken} = require('../helper/jwt');


route.get('/', productController.allProduct);
route.post("/list", productController.list);
route.get('/allstock', productController.allStock);
route.post('/allstock', productController.allStock);
route.get('/allbranch', productController.allBranch);
route.get('/detail/:id', productController.getDetailProduct);
route.get('/productlist', productController.productList);
route.get("/allproducts", readToken, productController.getAllProducts);
route.post("/addproducts", readToken, uploader('/imgProduct', 'PRO').array('images', 1), productController.addProduct);
route.patch("/editproducts/:uuid", readToken, uploader('/imgProduct', 'PRO').array('images', 1), productController.editProduct);
route.delete("/deleteproducts/:uuid", readToken, productController.deleteProduct);
route.get("/allhistorystock", readToken, productController.getHistoryStock);





module.exports = route;