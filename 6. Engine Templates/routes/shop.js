const express = require('express');
const path = require('path');

const router = express.Router();

const rootDir = require('../utils/path');

const adminData = require('./admin');
/**
 * To serve HTML file, we have to use the sendFile method
 * It takes the absolute path of the file
 * We use path to construct the file path
 * __dirname is a global variable on NodeJs that points to the current absolute path
 * 
 */
router.get('/',(req, res, next) => {
    const products = adminData.products;
    /**
     * We use sendFile to show a html file or to serve it
     
        console.log(adminData.products)
        res.sendFile(path.join(rootDir,'views', 'shop.html'))
    */

    /**
     * To render a page dynamically using a Template Engine
     * We have to use res.render
     * Since we specify where to find the "views"
     * We don't have to explicitely the path of the view
     * Just specify the name of the view
     */
    res.render('shop', {prods: products, docTitle: 'Shop', path: '/'})
});

module.exports = router;
