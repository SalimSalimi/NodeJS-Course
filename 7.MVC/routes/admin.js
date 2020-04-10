const express = require('express');
const path = require('path')

const router = express.Router();

const rootDir = require('../utils/path');

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    //Send data!
    res.render('add-product', {docTitle: "Add product", path: '/admin/add-product'});
});

//Triggering a route for a specific method request
// /admin/add-product => POST
router.post('/add-product',(req,res,next) => {
    //We have to use body-parser to parse the body of the incoming request
    products.push({title: req.body.title});
    res.redirect("/");
})

exports.router = router;
exports.products = products;