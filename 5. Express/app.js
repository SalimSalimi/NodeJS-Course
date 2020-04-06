const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Adding body-parser to parse the body of the request
app.use(bodyParser.urlencoded({extended: false}));

/*Middleware => To Handle the request 
**  We can add multiple routes
**  To do it, we just have to use app.use
**  It executes by order
**  The template defines how the endpoint should start
**  For example: if we do '/' first and access another endpoint
**  It will go to '/' first! 
**/
app.use('/',(req, res, next) => {
    next(); // Going to next middleware
});

app.use('/add-product', (req, res, next) => {
    //Send data!
    res.send('<form method="POST" action="/product"><input type="text" name="title"><button type="submit">Add product</button>');
});

//Triggering a route for a specific method request
app.post('/product',(req,res,next) => {
    //We have to use body-parser to parse the body of the incoming request
    console.log(req.body);
    res.redirect("/");
})

app.use('/',(req, res, next) => {
    res.send('<h1> Route page <h1>');
});

app.listen(3000);