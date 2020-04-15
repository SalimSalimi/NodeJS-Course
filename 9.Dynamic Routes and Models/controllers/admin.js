const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    //Send data!
    res.render('admin/add-product', {
        pageTitle: "Add product",
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}

exports.postAddProduct = (req,res,next) => {
    //We have to use body-parser to parse the body of the incoming request
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    
    const product = new Product(title, imageUrl, description, price);

    product.save();
    res.redirect("/");
}

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products'
        })
    });
}