const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

/**
 * To serve HTML file, we have to use the sendFile method
 * It takes the absolute path of the file
 * We use path to construct the file path
 * __dirname is a global variable on NodeJs that points to the current absolute path
 * 
 */
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct)

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders)

module.exports = router;
