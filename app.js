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

app.use(adminRoutes); 
app.use(shopRoutes);

app.listen(3000);