const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    /**
     * We use sendFile to show a html file or to serve it
     
        console.log(adminData.products)
        res.sendFile(path.join(rootDir,'views', 'shop.html'))
    */

    /**
     * To render a page dynamically using a Template Engine
     * We have to use res.render
     * Since we specify where to find the "views"
     * We don't have to explicitely the path of the view
     * Just specify the name of the view
     */
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        })
    });
    
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        })
    });
};

exports.getCart = (req, res) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your cart'
    });
}

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}