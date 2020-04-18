const fs = require('fs');
const path = require('path');
const mainPath = require ('../utils/path');

const pathFile = path.join(mainPath, 'data', 'products.json');

const getProductsFromFile = callback => {
    const pathFile = path.join(mainPath, 'data', 'products.json');
    fs.readFile(pathFile, (error, fileContent) => {
        if(error) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                //Update an existing product
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(pathFile, JSON.stringify(updatedProducts), (err) => {
                    console.log(err)
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(pathFile, JSON.stringify(updatedProducts), (err) => {
                    console.log(err)
                });   
            }
        });
    }
    //We should pass callback because reading file is asynchronous
    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static findById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }
}