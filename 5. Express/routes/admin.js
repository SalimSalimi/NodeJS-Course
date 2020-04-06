const express = require('express');
const path = require('path')

const router = express.Router();

const rootDir = require('../utils/path');

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    //Send data!
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

//Triggering a route for a specific method request
// /admin/add-product => POST
router.post('/add-product',(req,res,next) => {
    //We have to use body-parser to parse the body of the incoming request
    console.log(req.body);
    res.redirect("/");
})

module.exports = router;