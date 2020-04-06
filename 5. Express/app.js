const http = require('http');
const express = require('express');

const app = express();

/*Middleware => To Handle the request 
**  We can add multiple routes
**  To do it, we just have to use app.use
**  It executes by order
**  The template defines how the endpoint should start
**  For example: if we do '/' first and access another endpoint
**  It will go to '/' first! 
**/
app.use('/',(req, res, next) => {
    console.log("Add prod");
    next(); // Going to next middleware
});

app.use('/add-product', (req, res, next) => {
    //Send data!
    res.send('<h1> Add product page! <h1>');
});

app.use('/',(req, res, next) => {
    res.send('<h1> Route page <h1>');
});

app.listen(3000);