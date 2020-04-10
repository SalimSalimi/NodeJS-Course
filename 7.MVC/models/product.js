const fs = require('fs');
const path = require('path');
const mainPath = require ('../utils/path');
const products = [];

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        const pathFile = path.join(mainPath, 'data', 'products.json');
        fs.readFile(pathFile, (error, fileContent) => {
            let products = [];
            if(!error) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(pathFile, JSON.stringify(products), (err) => {
                console.log(err)
            });
        })
    }

    static fetchAll() {
        const pathFile = path.join(mainPath, 'data', 'products.json');
        fs.readFile(pathFile, (error, fileContent) => {
            if(error) {
                return [];
            }
            return JSON.parse(fileContent);
        })
    }
}