//fetching a cart from file
const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename), // Get the directory of the main module
  "data", // Subdirectory for data
  "cart.json"
);

module.exports = class Cart {
    static addProduct(id, productPrice){
        //fetch the previous cart
        // Read the cart data from the file
        fs.readFile(p, (err, fileContent) => {
      // Initialize a default cart structure in case the file doesn't exist or is empty
            let cart = {products: [], totalPrice:0};
            // If the file exists and is readable, parse its content
            if(!err && fileContent){
                cart = JSON.parse(fileContent);
            }
        //analyze the cart => find existing product
        const existingProductIndex = cart.products.findIndex(
            prod => prod.id == id);// Check if the product ID matches
            // Retrieve the existing product (if found)
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;
        //add new product/ increase quantity
        if(existingProduct){
            updatedProduct = {...existingProduct};  // Create a copy of the existing product
            updatedProduct.qty = updatedProduct.qty + 1;// Increment the quantity by 1
            cart.products = [...cart.products];// Ensure cart.products is updated immutably
            cart.products[existingProductIndex] = updatedProduct;// Replace the old product with the updated one

        }else{
            // If the product doesn't exist, add it to the cart with an initial quantity of 1
            updatedProduct = {id:id, qty:1};// Create a new product object
            cart.products = [...cart.products, updatedProduct]; // Add the new product to the cart
        }
        // Update the total price of the cart
        cart.totalPrice = cart.totalPrice + + productPrice;// Add the product price to the total (convert productPrice to a number with `+`)
        // Write the updated cart data back to the file
        fs.writeFile(p, JSON.stringify(cart), (err) => {
            console.log(err);
        });
   });
} 
}