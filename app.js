const path = require('path');

const http = require('http');
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug'); //Set Pug as the templating engine
app.set('views', './views'); // Set the views directory

const adminRoutes = require('./routes/admin');  // importing admin.js
const shopRoutes = require('./routes/shop');  // importing shop.js

//for parsing incoming request body. add it before route handling middleware
//do npm i --save body-parser
//parses URL-encoded form data into a JavaScript object and disables parsing of extended data structures.
app.use(bodyParser.urlencoded({extended:false}));

//it serves static files. So we can execute this function.
//and now we just have to pass in a path to the folder which we want to serve statically.
app.use(express.static(path.join(__dirname, 'Public')));

//filtering Paths
app.use('/admin', adminRoutes); 
app.use(shopRoutes);

//gives 404 page for wrong /
app.use((req, res, next) => {
    res.status(404).sendFile(path.join( __dirname, 'views', '404.html'));
});

app.listen(3000);

