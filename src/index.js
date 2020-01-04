const mongoose = require('mongoose');
const serverless = require('serverless-http');

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// Load Mongoose Models
require('./models/Customer');
require('./models/Invoice');

const app = require('./app');

module.exports.handler = serverless(app);
