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
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
}

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
            pageTitle: 'Shop',
            path: '/',
            hasProducts : products.length > 0,
            activeShop: true,
            productCSS: true
        })
    });
    
}