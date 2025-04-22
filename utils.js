
const libMongoose = require('mongoose'); // Importing the Mongoose library to interact with MongoDB
const User = require('./models/User.model.js'); // Importing the User model (assuming it defines the schema for the users collection)
require('dotenv').config();

const utils = {}; // Creating an empty object to store utility functions and connections

// Establishing a connection to MongoDB and storing the promise in `utils.connection`
utils.connection = libMongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("mongodb connected"); // Logging success message after connection
});


module.exports = utils; // Exporting the `utils` object, which contains the MongoDB connection
