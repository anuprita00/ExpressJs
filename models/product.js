const fs = require("fs");
const path = require("path");

const Cart = require('./cart');

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
  constructor(id, title, imgURL, price, description) {
    // Initialize the product with a title.
    this.id = id,
    this.title = title;
    this.imgURL = imgURL;
    this.price = price;
    this.description = description;
  }

  save() {
    //assigning a unique id when we save a product
    getProductsFromFile(products => {
      if(this.id){
        const existingProductIndex = products.findIndex(
          prod => prod.id == this.id
        );
        const updatedProduct = [...products];
        updatedProduct[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProduct), err => {
          console.log(err);
        });
      } 
      else{
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
      }  
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
  
  //delete 
  static deleteById(id){
     // Retrieve the list of products from the file
    getProductsFromFile(products => {
       // Find the product with the matching `id`
      const product = products.find(prod => prod.id == id);
       // Filter out the product with the given `id` to create an updated product list
      const updatedProduct = products.filter(product => product.id != id);
       // Write the updated product list back to the file
      fs.writeFile(p, JSON.stringify(updatedProduct), err => {
        if(!err){
          // If there is no error in writing to the file, delete the product from the cart
          // The `Cart.deleteProduct` method is called, passing the `id` and `product.price`
          Cart.deleteProduct(id, product.price);
        }
      }) 
    });
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
