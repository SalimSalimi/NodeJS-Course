const express = require('express');
const path = require('path');

const router = express.Router();

const productsController = require('../controllers/products');

/**
 * To serve HTML file, we have to use the sendFile method
 * It takes the absolute path of the file
 * We use path to construct the file path
 * __dirname is a global variable on NodeJs that points to the current absolute path
 * 
 */
router.get('/', productsController.getProducts);

module.exports = router;
