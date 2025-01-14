const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
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
    Product.fetchAll(products => {
        res.render("admin/products",{
            prods: products,
            pageTitle: "Admin Products",
            path: "/admin/products",
          });
    });

}