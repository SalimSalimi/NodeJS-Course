const express = require('express');
const router = express.Router();


router.use('/add-product', (req, res, next) => {
    //Send data!
    res.send('<form method="POST" action="/product"><input type="text" name="title"><button type="submit">Add product</button>');
});

//Triggering a route for a specific method request
router.post('/product',(req,res,next) => {
    //We have to use body-parser to parse the body of the incoming request
    console.log(req.body);
    res.redirect("/");
})

module.exports = router;