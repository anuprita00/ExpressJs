const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-products", {
      pageTitle: "Add Product",
      path: "admin/add-product", 
      editing: false
    });
};

exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imgURL = req.body.imgURL;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imgURL, price, description);
    product.save();
    res.redirect('/');   
};

//edit product
// Controller function to handle requests to edit a product
exports.getEditProduct = (req, res, next) => {
    // Extract the 'edit' query parameter from the request
    const editMode = req.query.edit;
    // If 'edit' query parameter is not true, redirect to the home page
    if (!editMode) {
      return res.redirect('/');
    }
    // Extract the product ID from the route parameters
    const prodId = req.params.productId;
    // Find the product by its ID
    Product.findById(prodId, product => {
      // If no product is found with the given ID, redirect to the home page
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-products', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-products',
        editing: editMode, // Indicates that the page is in edit mode
        product: product // Passes the product details to the view for pre-population
      });
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImgURL = req.body.imgURL;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(
    prodId, 
    updatedTitle,
    updatedImgURL,
    updatedPrice,
    updatedDescription
  )
  //console.log(updatedProduct);
  updatedProduct.save();
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("admin/products",{
            prods: products,
            pageTitle: "Admin Products",
            path: "/admin/products",
          });
    });
}

exports.postDeleteProduct = (req, res, next) => { 
  const prodId = req.body.productId; 
  Product.deleteById(prodId);
  res.redirect('/admin/products')
  }
  