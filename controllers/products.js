const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "admin/add-product",
    activeProduct: true,
    productCSS: true,
    formCSS: true,
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  // products.push({title: req.body.title}),
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  //const products = adminData.products;
  // Fetch all products using the static fetchAll method of the Product class
  Product.fetchAll(products => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProduct: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
