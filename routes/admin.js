const express = require('express');

const router = express.Router();

//Handling routes
router.get('/add-product',(req, res, next) => { //handles only get
    res.send(`<html>
        <form action="/product" method="POST">
        <input type ="text" name ="title">
        <button type="submit">Add Product</button> 
        </form></html>`);  
});

router.post('/product',(req, res) =>{  // handles only post
    console.log(req.body); //logs form data 
    res.redirect('/');// for redirecting to the routes
});


module.exports = router;


