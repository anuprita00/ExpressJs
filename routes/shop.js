const express = require('express');

// creates a new router instance.
//Routers allow modular and organized handling of routes in Express applications.
const router = express.Router();

router.get('/',(req, res, next) => {
    res.send("<h1>Hello from Express JS!</h1>"); //send a response
});

//exported so it can be imported and used in the main application file.
module.exports = router;