const express = require('express');
const path = require('path')

const router = express.Router();

const adminController = require('../controllers/admin');

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

//Triggering a route for a specific method request
// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;