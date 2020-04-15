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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(pathFile, JSON.stringify(products), (err) => {
            console.log(err)
            });
        });
    }
    //We should pass callback because reading file is asynchronous
    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
}