const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

// create our Express app
const app = express();

// TODO: Setup CORS

// Takes the raw requests and turns them into usable properties on req.body
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Provide resolver functions for your schema fields
const resolvers = {
    ...Mutation,
    ...Query
};

app.get('/', (req, res) => {
    res.send('It works!');
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: resolvers,
        graphiql: true
    })
);

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send({ Error: err.stack });
});

// done! we export it so we can start the site in start.js
module.exports = app;
