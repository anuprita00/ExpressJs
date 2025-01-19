const fs = require("fs");
const path = require("path");

// const products = [];
// Import required modules for file system operations and path management
//const { getProduct } = require("../controllers/shop");

// Define the path to the JSON file where products are stored.
const p = path.join(
  path.dirname(require.main.filename), // Get the directory of the main module
  "data", // Subdirectory for data
  "products.json"
); // File to store product data

//Reads the contents of the JSON file and parses it. 
// If the file doesn't exist or an error occurs, it invokes the callback function with an empty array.
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};


// Define the Product class
module.exports = class Product {
  constructor(title, imgURL, price, description) {
    // Initialize the product with a title.
    this.title = title;
    this.imgURL = imgURL;
    this.price = price;
    this.description = description;
  }

  save() {
    //assigning a unique id when we save a product
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });

    // //products.push(this);
    // // Define the path to the JSON file where products are stored.
    // const p = path.join(
    //   path.dirname(require.main.filename), // Get the directory of the main module
    //   "data", // Subdirectory for data
    //   "products.json"
    // ); // File to store product data

    // // Read the existing contents of the JSON file
    // fs.readFile(p, (err, fileContent) => {
    //   let products = []; // Initialize an empty array to store products
    //   if (!err) {
    //     // If no error, parse the file content to retrieve existing products
    //     products = JSON.parse(fileContent);
    //   }
    //   // Add the current product instance to the array
    //   products.push(this);
    //   // Write the updated products array back to the JSON file
    //   fs.writeFile(p, JSON.stringify(products), (err) => {
    //     // Log any error that occurs during file writing
    //     console.log(err);
    //   });
    // });

}

  // Static method to fetch all products
  static fetchAll(cb) {
    // return products;
    getProductsFromFile(cb);
  }

  // static findById(id, cb) { 
  //   getProductsFromFile(products => {
  //     // console.log(products);
  //     const product = products.find(product =>{
  //       console.log(products.id);
  //       return product.id == +id;
  //     });
  //     cb(product);
  //   });
  // }
  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(product => product.id == id);
      cb((product));
    });
  }

};
