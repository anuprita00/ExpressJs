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
    const title = req.body.title;
    const imagrURL = req.body.imagrURL;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, imagrURL, price, description);
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