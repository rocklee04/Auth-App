const express = require('express');
const productRouter = express.Router();
const productController = require('../Controller/product.controller')
const {auth, authRole} = require('../Middlewares/auth')
const {Roles} = require('../utilis/constants')

productRouter.get('/products', productController.getAllProducts)
productRouter.post('./addProducts', auth, authRole(Roles.Seller), productController.addProduct)
productRouter.delete('./delete/id', auth, authRole(Roles.Seller), productController.delete)

exports.module = productRouter;