const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//Adding body-parser to parse the body of the request
app.use(bodyParser.urlencoded({extended: false}));

/*Middleware => To Handle the request 
**  We can add multiple routes
**  To do it, we just have to use app.use
**  It executes by order
**  The template defines how the endpoint should start
**  For example: if we do '/' first and access another endpoint
**  It will go to '/' first! 
**  It applies only if we use "use" instead of get, post..
**/

/********
 * Routes => a better way to define routes and separate in different files
 * Using express.Router()
 * After defining the routes, we must export the router object
 * Import it and use those middleware with app.use
 */

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);