
const mongoose = require('mongoose'); // Importing the Mongoose library to define schemas and interact with MongoDB

// Defining the user schema with fields: name, email, phone, password, and address
const userSchema = new mongoose.Schema({
    name: {
        type: String,  // The 'name' field should be a string
        required: true // This field is mandatory
    },
    email: {
        type: String,   // The 'email' field should be a string
        required: true, // This field is mandatory
        unique: true    // Ensures no two users have the same email
    },
    phone: {
        type: Number,  // The 'phone' field should be a number
        required: true // This field is mandatory
    },
    password: {
        type: String,  // The 'password' field should be a string (hashed in practice)
        required: true // This field is mandatory
    },
    address: {
        type: String,  // The 'address' field should be a string
        required: true // This field is mandatory
    }
});


const User = mongoose.model('User', userSchema); // Creating the User model from the schema
module.exports = User; // Exporting the User model so it can be used in other parts of the application
