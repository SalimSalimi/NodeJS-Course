const Product = require("../models/product");

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
  Product.findAll()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    }).catch(error => {
      console.log(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  }).catch(error => {
    console.log(error);
  });
};

exports.getCart = (req, res) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
        .then(products => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: products
          });
        })
        .catch(error => {
          console.log(error);
        })
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      // Getting the product to update the quantity
      fetchedCart = cart;
      return cart.getProducts({where: { id: prodId }});
    })
    .then(products => {
      let product;
      if(products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {through: {quantity: newQuantity}});
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  req.user.getCart()
  .then(cart => {
    return cart.getProducts({where : {id : prodId}});
  })
  .then(products => {
    const product = products[0];
    return product.cartItem.destroy();
  })
  .then(() => {
    res.redirect('/cart');
  })
  .catch(error => {
    console.log(error);
  })
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.postOrder = (req, res) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      req.user.createOrder()
        .then(order => {
          return order.addProducts(products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity};
            return product;
          }));
        })
        .catch(error => {
          console.log(error);
        });
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(error => {
      console.log(error);
    }) 
}

exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

