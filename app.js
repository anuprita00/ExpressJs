const path = require('path');

const http = require('http');
const express = require('express');

const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars') //adding templating engine

const errorController = require('./controllers/error');
const app = express();

//app.set('views engine', 'ejs'); //templating engine
// app.engine('hbs', expressHbs({layoutDir: 'views/layouts/',
//       defaultLayout: 'main-layout',
//        extname: "hbs"}));

// app.set('view engine', 'hbs');
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
app.use(errorController.get404Page
//    (req, res, next) => {
//    // res.status(404).sendFile(path.join( __dirname, 'views', '404.html'));
//    res.status(404).render('404',{pageTitle: 'Page Not Found!'});
// }
);

app.listen(3000);

