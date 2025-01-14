const path = require('path');

const express = require('express');

const adminController =require('../controllers/admin');

const router = express.Router();


// const products = [];

//Handling routes
// /admin/add-product -GET
router.get('/add-product', adminController.getAddProduct  //adding controller
    // (req, res, next)=> { //handles only get
    // // res.sendFile(path.join(__dirname,'../' ,'views', 'add-product.html'));
    // res.render('add-product', {pageTitle: 'Add Product', 
    //     path:'admin/add-product',
    //     activeProduct: true,
    //     productCSS: true,
    //     formCSS:true
    // })
// }
);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product-POST
router.post('/add-product', adminController.postAddProduct
    // (req, res) =>{  // handles only post
    // // console.log(req.body); //logs form data 
    // products.push({title: req.body.title})
    // res.redirect('/');// for redirecting to the routes
// }
);


// exports.routes = router;
// exports.products = products;
module.exports = router;


