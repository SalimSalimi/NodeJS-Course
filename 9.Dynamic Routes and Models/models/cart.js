const fs = require('fs');
const path = require('path');
const mainPath = require ('../utils/path');

const pathFile = path.join(mainPath,
    'data',
    'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(pathFile, (error, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!error) {
                cart = JSON.parse(fileContent);
            }
            //Analyze the cart => Find existing product
            
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products.find(product => product.id === id);
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                //Replace the product on the index
                cart.products [existingProductIndex] = updatedProduct;
                
            } else {
                updatedProduct = {id: id, qty:1};
                //Add updatedProduct if it's new
                cart.products = [...cart.products, updatedProduct];
            }
            //+ before productPrice is to convert as a number
            cart.totalPrice = cart.totalPrice + +productPrice;
            
            fs.writeFile(pathFile, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }
}