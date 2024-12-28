const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) =>{  //use allows us to add middleware functions
    console.log("In the middleware!");
    next(); //Allows the request to continue to the next middleware in line
});

app.use((req, res, next) => {
    console.log("In another middleware!");
    res.send("<h1>Hello from Express JS!</h1>"); //send a response
});

app.listen(3000);