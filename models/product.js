// const products = [];
// Import required modules for file system operations and path management
const fs = require("fs");
const path = require("path");

// Define the Product class
module.exports = class Product {
  constructor(title) {
    // Initialize the product with a title.
    this.title = title;
  }

  save() {
    //products.push(this);
    // Define the path to the JSON file where products are stored.
    const p = path.join(
      path.dirname(require.main.filename), // Get the directory of the main module
      "data", // Subdirectory for data
      "products.json"
    ); // File to store product data

    // Read the existing contents of the JSON file
    fs.readFile(p, (err, fileContent) => {
      let products = []; // Initialize an empty array to store products
      if (!err) {
        // If no error, parse the file content to retrieve existing products
        products = JSON.parse(fileContent);
      }
      // Add the current product instance to the array
      products.push(this);
      // Write the updated products array back to the JSON file
      fs.writeFile(p, JSON.stringify(products), (err) => {
        // Log any error that occurs during file writing
        console.log(err);
      });
    });
  }

  // Static method to fetch all products
  static fetchAll(cb) {
    // return products;
    // Define the path to the JSON file (this variable is missing from the code, causing a bug)
    const p = path.join(
      path.dirname(require.main.filename), // Get the directory of the main module
      "data", // Subdirectory for data
      "products.json"
    );

    // Read the JSON file to retrieve the list of products
    fs.readFile(p, (err, fileContent) => {
      if(err) {
        // If an error occurs (e.g., file not found), return an empty array via the callback
        cb([]);
      }
      // Parse the file content and return the array of products via the callback
      cb(JSON.parse(fileContent));
    });
  }
};
