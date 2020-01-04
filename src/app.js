const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const routes = require('./routes/index');

// create our Express app
const app = express();

// TODO: Setup CORS

// Takes the raw requests and turns them into usable properties on req.body
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: It's throwing error right now
// // decode the JWT so we can get the user Id on each request
// app.use((req, res, next) => {
//     const { token } = req.cookies;
//     if (token) {
//         const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         // put the userId onto the req for future requests to access
//         req.userId = userId;
//     }
//     next();
// });

// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes);

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send({ Error: err.stack });
});

// done! we export it so we can start the site in start.js
module.exports = app;
