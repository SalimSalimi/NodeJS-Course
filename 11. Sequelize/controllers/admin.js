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
    res.redirect("/admin/products");
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
  Product.findByPk(productId).then((product) => {
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
  }).catch(error => {
    console.log(error);
  });
};

exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const updatedTtile = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;

  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTtile;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDescription;
      product.price = updatedPrice;
      return product.save();
    })
    .then(() => {
      console.log("Product updated");
      res.redirect("/admin/products");
    }).catch(error => {
      console.log(error);
    });
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log("Product successfully deleted!");
      res.redirect('/admin/products');
    })
    .catch(error => console.log(error));
};

exports.getProducts = (req, res) => {
  Product.findAll().then(products => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin products",
      path: "/admin/products",
    });
  }).catch(error => {
    console.log(error);
  });
};