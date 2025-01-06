const path = require('path');

const express = require('express');

const adminData = require('./admin');

const productsController = require('../controllers/products')

// creates a new router instance.
//Routers allow modular and organized handling of routes in Express applications.
const router = express.Router();

router.get('/', productsController.getProducts
    // (req, res, next) => {
    //Path join basically detects the operating system you're running on and then automatically builds a correct path.
    //../ and this simply means go up one level,
    //so if it's up one level it's in the root folder then into views 
    // console.log(adminData.products);
    // res.sendFile(path.join(__dirname,'../', 'views', 'shop.html')); 
//     const products = adminData.products;
//     res.render('shop',
//         {prods: products, 
//         pageTitle:'Shop', path:'/', 
//         hasProduct: products.length > 0,
//         activeShop: true,
//     });
    
// }
);

//exported so it can be imported and used in the main application file.
module.exports = router;