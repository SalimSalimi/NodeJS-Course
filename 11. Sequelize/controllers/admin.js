const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  //Send data!
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  //We have to use body-parser to parse the body of the incoming request
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  }).then(() => {
    console.log("Product added");
  }).catch(error => 
    console.log(error)
    );
};

exports.getEditProduct = (req, res, next) => {
  //It's redundent but it only an example here
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }
  //Fetching the product
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    if (product) {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    } else {
      res.redirect("/");
    }
  });
};

exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const updatedTtile = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;

  const updatedProduct = new Product(
    prodId,
    updatedTtile,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin products",
      path: "/admin/products",
    });
  });
};
