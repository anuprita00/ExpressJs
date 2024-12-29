const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//for parsing incoming request body. add it before route handling middleware
//do npm i --save body-parser
//parses URL-encoded form data into a JavaScript object and disables parsing of extended data structures.
app.use(bodyParser.urlencoded({extended:false}));

//Handling routes
app.use('/add-product',(req, res, next) => {
    res.send(`<html>
        <form action="/product" method="POST">
        <input type ="text" name ="title">
        <button type="submit">Add Product</button> 
        </form></html>`);  
});

app.use('/product',(req, res) =>{
    console.log(req.body); //logs form data 
    res.redirect('/');// for redirecting to the routes
});

app.use('/',(req, res, next) => {
    res.send("<h1>Hello from Express JS!</h1>"); //send a response
});

app.listen(3000);