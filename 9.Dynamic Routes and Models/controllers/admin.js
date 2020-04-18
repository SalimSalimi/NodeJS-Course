const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    //Send data!
    res.render('admin/edit-product', {
        pageTitle: "Add product",
        path: '/admin/add-product',
        editing: false
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

exports.getEditProduct = (req, res, next) => {
    //It's redundent but it only an example here
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    //Fetching the product
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        if (product) {
            res.render('admin/edit-product', {
                pageTitle: "Edit Product",
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        } else {
            res.redirect('/');
        }
    })
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