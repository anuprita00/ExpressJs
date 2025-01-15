const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  //const products = adminData.products;
  // Fetch all products using the static fetchAll method of the Product class
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

//getting product details of specific product
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
  res.redirect("/");
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });

}

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
      pageTitle: "Your Cart",
      path: "/cart",
    });

};

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