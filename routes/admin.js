const path = require('path');

const express = require('express');

const router = express.Router();

//Handling routes
// /admin/add-product -GET
router.get('/add-product',(req, res, next) => { //handles only get
    
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

// /admin/add-product-POST
router.post('/add-product',(req, res) =>{  // handles only post
    console.log(req.body); //logs form data 
    res.redirect('/');// for redirecting to the routes
});

module.exports = router;


