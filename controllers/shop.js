const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  //const products = adminData.products;
  // Fetch all products using the static fetchAll method of the Product class
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

//getting product details of specific product
exports.getProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  // Product.findById(prodId, product => {
  //   console.log(product);
  // });
  // res.redirect('/');
  Product.findById(prodId, (product) => {
    //console.log();
    res.render("shop/product-details", {
      product: product,
      pageTitle: `${product.title}`,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      // Initialize an array to store the products in the cart
      const cartProducts = [];
      for (product of products) {
        // Find the corresponding product in the cart by matching IDs
        const cartProductData = cart.products.find(
          (prod) => prod.id == product.id);

        if (cartProductData) {
          cartProducts.push({ productData: product, // The full product details
            qty: cartProductData.qty }); // The quantity of the product in the cart
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts // Pass the cart products to the view
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; // Correctly retrieve the product ID from the request body
  //console.log(prodId); // Log the product ID for debugging
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });

  res.redirect("/cart"); // Redirect the user to the cart page
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  })

}

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

