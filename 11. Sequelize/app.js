const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const sequelize = require('./utils/database');

const Product = require('./models/product');
const User = require('./models/user');
//Adding body-parser to parse the body of the request
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * To serve static files like JS scripts or css files
 * NodeJs blocks the access to read or write on the files
 * To have read access right, we have to use express.static
 * On our case, it will serve the folder public to access css files
 */
app.use(express.static(path.join(__dirname, "public")));

/*  Template View Engines
 *  It generates the HTML code for our page dynamically
 *  There is 3 major: EJS, PUG, handlebars
 *  We have to specify which template engine we would use like this
 */
app.set("view engine", "ejs");
//Specify to express and view engine where to find the views
app.set("views", "views");

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

/**
 * When we have routes that share the same root like "/admin/" in this case
 * We can ommit the /admin/ on the routes and add it on app.use
 * This way, whenever a route get executed on adminRoutes
 * It will executes /admin/(route)
 * We don't have to specify admin on our route on adminRoutes
 */
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraint: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize.sync({force: true}).then(() => {
  app.listen(3000, () => {
    console.log("Server started at port 3000");
  });  
}).catch(error => {
  console.log(error);
});

