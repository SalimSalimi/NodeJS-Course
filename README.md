## Dynamic routes

The goal of dynamic route is to specify which element (product) that we want to access according to his ID. We have just to print with EJS `<%= product.id>` on `<a>`

- **NOTE**: The order is important, we should make dynamic routes after static routes (In case they share the same root). Example:

```
app.get("products/delete", handler);
app.get("products/:something, handler);
```

If we invert the order here, It will consider "delete" like an argument so It will execute the second one.

#### Access parameter from the request

To access a parameter from the request, we simply use `req.params.parameterName` to access it on our controller. `const parameterValue = req.params.parameterName`. For now, It should treated as a String.

#### Query Parameters

Query parameters are optional parameters that are sent with in the URL. Example: `https://example.com/route?param1=value&param2=value`.

To access it from a request handler, we can use the req object by: `req.query.paramName`.

#### Handling POST requests

We access to the POST parameters from the body with : `req.body.parameterName`. Sometimes, we would need to send the ID for example without showing it on the UI, we can add input element of type hidden, giving it a value of the ID and give it a name to access it from the request handler.

# Databases

## SQL

SQL databases consists of a multiple tables defined by a name. Every table has columns. Rows represent the data. We can connect between tables (relation) using foreign keys. So, SQL database has:

### Characteristics

- **Data Schema**: Each table, we defind how the data is represented (String, text, boolean..)
- **Data Relations**: We relate relations with different tables and we have 3 different relations: _One-To-One_, _One-To-Many_, _Many-To-Many_.

## NoSQL

NoSQL stands that it doesn't follow the SQL logic (Doesn't use SQL language, doesn't have a data schema).

The table equivalent on NoSQL databases are called _Collections_. On collections, we will find _documents_ (records equivalent on SQL).

It doesn't have relations, but instead, we duplicate the data to make some sort of a relation between documents.

### Characteristics

- **No Data Schema**: It doesn't have a fixes data schema. We can have different records of multiple schemas on the same collection.
- **No Relation**: It doesn't have relation between or at least just few relations between collections. It's not recommended because It will make the query slower.

## SQL vs NoSQL

### Scaling

Scaling is the action of adding more capacities to our system (CPU, Memory, Storage). To do so, we have 2 methods:

### Horizontal Scaling

For Horizontal Scaling, we add more servers to our servers. It can be infinite and the only issue is that we have to merge and try to synchronize all the servers between each other.

### Vertical Scaling

For Vertical Scaling, we simply add or replace components of our existing server, but it's limited since we can't not have more than amount of CPU for example.

### SQL vs NoSQL difference

![SQL vs NoSQL](https://i.imgur.com/mEi3eGM.png)

# SQL Database Implementation

## SQL Default Implementation

### Installation of Dependencies

To implement a SQL database with Node, we have first to install mysql2 with npm: `npm install --save mysql2`.

### Configuration and connection

To connect to any database server, it's common to close the connection after every request, but at sometime, it could be heavy to handle it. So, in order to avoid this, we can create a pool.

To create a pool, we have to use the mysql object and create a new pool, we have to specify the host, username, database name and mysql password. _(See database.js)_

#### Execute a query

To execute a query, we have to use the `execute("query")` method provided by `pool` that we created (it uses promises) to execute a query. So:

```
pool.execute("SELECT * FROM tableName")
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(error);
    })
```

#### Insert data safely

To insert data, we have to execute an INSERT query.

- **IMPORTANT**: To avoid SQL Injections, we have to write our query and sending parameters by letting MySQL formatting them. To do so, we have to represent the values using '?' and pass the data out of the query, passing them as argument like this:
  ```
  db.execute(
    "INSERT INTO products (title, price, imageUrl, description) VALUE (?, ?, ?, ?)",
    [this.title, this.price, this.imageUrl, this.description]
  );
  ```

## SQL Implementation with Sequelize

### Core Concept

Sequelize is a third-party package, more precisely an ORM library. It handles the creation of the tables, insert, update, relations etc. so we don't have to write any SQL code. We define a model which represents a class for example (users, product..). We instanciate those models using a build method on the model defined by Sequelize and then we can execute queries to insert, get all, and defining the relations. 

### Installation

To install Sequelize, we have to install package sequelize: `npm install --save sequelize`.

- **IMPORTANT** : The package mysql2 must be installed too in order to work.

### Initialisation

To initialize Sequelize, we have to import it first and then intianciate a Sequelize object. This object is initialized with: database name, username, password. Optionnally, we can specify the host (which is by default localhost) and database engine type which is mysql. We do that by creating an object as 4th argument with: `host` and `dialect` as properties. Example:

```
const sequelize = Sequelize("node-complete", "root", "sasa42+", {
  dialect: "mysql",
  host: "localhost"
});
```

### Defining a Model

To define a Model, we have to import sequelize object initialized and call a function `define()` to define a new model. First argument represents the name of the model, after that we declare an object that represents our model. For every property of our model, we declare an another object that contains `type` (type is defined with Sequelize package) as a property and other property that we can use like: allowNull, primaryKey, autoIncrement..(Optionnally, we can specify directly the type)
Example:
```
const Product = sequelize.define("product", {
  id: {
    type = Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING
});
```

### Synchronizing Models with Database

To make Sequelize create tables defined by the models, we should import the Sequelize object that instanciated database and call the sync() method to create it (It returns a Promise). 

- **IMPORTANT**: It creates two other columns (createdAt & updatedAt), we can desactivate that.

### Adding a new entry to the database

To add a new entry to the database, we have to use the Product model and use `create()` or `build()` method. The difference between the two methods is that the first one adds automatically to the database. The create method takes an object of type of the model itself. Example: `Product.create(object)`.

### Fetching Data 

#### Fetching all the data
To fetch from database, we use Product model and call `findAll()` method to fetch all the data. It returns a Promise. 

- *N.B*: In `findAll()` method, we can add options like WHERE condition..

#### Fetching data by Id
To fetch data by ID, we use the method `findByPk()` method to fetch all the data. It returns a Promise.

#### Fetching data by where condition
To fetch data by a condition, we use the method `findAll()` and in parenthesis we pass an object that contains the property `where` and pass an another object. Example:

```
Product.findAll({where: {id: prodId}});
```

It returns a Promise and result is always an array.

#### Update data
To update a row on a table, we have to find the corresponding row that we want to chage with `findByPk`. We set the new values to the object result, then to save it on the database, we have to call `product.save()` *(Otherwise, it will change only locally)*. This function returns a Promise, we return `product.save()` to handle the promise, and in `then()`, we are sure that the object is updated on the database. 

#### Delete data
To delete a row on a table, it's the same logic with the update. Instead of calling `Product.save()`, we just call `Product.destroy()` on the product returned by the query. 

### Associations
To create associations between table, Sequelize a bunch of useful methods that can create those associations for us. The method `belongsTo` called on a Model creates an association of one-to-many, also `hasMany()` do the same thing. We can add constraints to `belongsTo` by creating an object that has a property `constraints: true`. We can express constraints like `onDelete: 'Cascade`.

Example of user having many products: `Product.belongsTo(User, { constraint: true, onDelete: 'CASCADE'});` OR `User.hasMany(Product)`.

#### Adding Data Association
While defining our models and associations, Sequelize creates new methods to add new entries while respecting the association. For example: A user can is associated with multiple products, so Sequelize provides a method to create a new Product and associated with the user directly. To do so, we use the models: `User.createProduct({object})`. 

#### Fetching Data Association
As for adding, Sequelize provides also methods to fetch data. For example, to fetch all products associated with one user: `User.getProducts()`. We can also add conditions (like where) in parenthesis.

#### Association Many-To-Many

When we have an association of **Many-To-Many**, we must create an intermediate table. To do so, we create a new model, define an id an other fields if we want. After that, on defining the relations, we must use the `ModelA.belongsToMany(ModelB)` to the models for two way. In addition, we must specify the model that will be used for the intermediate table. We specify by adding the object {through: ModelIntermediate} after Model on the function. Example: `ModelA.belongsToMany(ModelB, object)`.


To add a product into a cart, we can use `Cart.addProduct()` by specifying on the parameters the product object and an another object `{ through: { quantity: value }}` to specify other fields in the intermediate tables.


To access 

## Notes

When updating a new model, we should add an object `force: true` in `sync()` to update the tables schema. It will delete all the tables and the data on the database. 

# Side notes

- **include-EJS**: On EJS, if we include a template that uses a variable, this include is used inside a block (for-loop for example). We can pass that variable to the include like this: `<%- include('file', {value: variable})%>`

