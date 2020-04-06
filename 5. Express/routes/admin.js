const express = require('express');
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    //Send data!
    res.send('<form method="POST" action="/admin/add-product"><input type="text" name="title"><button type="submit">Add product</button>');
});

//Triggering a route for a specific method request
// /admin/add-product => POST
router.post('/add-product',(req,res,next) => {
    //We have to use body-parser to parse the body of the incoming request
    console.log(req.body);
    res.redirect("/");
})

module.exports = router;