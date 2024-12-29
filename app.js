const http = require('http');
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');  // importing admin.js
const shopRoutes = require('./routes/shop');  // importing shop.js

//for parsing incoming request body. add it before route handling middleware
//do npm i --save body-parser
//parses URL-encoded form data into a JavaScript object and disables parsing of extended data structures.
app.use(bodyParser.urlencoded({extended:false}));

//filtering Paths
app.use('/admin', adminRoutes); 
app.use(shopRoutes);

//gives 404 page for wrong /
app.use((req, res, next) => {
    res.status(404).send(`<h1>Page not found.</h1>`)
});

app.listen(3000);

