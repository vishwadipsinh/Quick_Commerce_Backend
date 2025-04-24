const User = require('../models/User.model.js'); // Importing the User model to interact with the users collection in MongoDB
const JWT = require('jsonwebtoken'); // Importing the JSON Web Token (JWT) library for authentication
const bcrypt = require('bcrypt');



userController = {}; // Creating an empty object to store controller functions

const JWT_SECRET_KEY = "nbjbdasojhcnsnayn984fujsdn"; // Defining a secret key for signing JWT tokens (should be stored in environment variables instead of hardcoding)

// ------------------------- User Login -------------------------
userController.userLogin = async (req, res) => {
    const { email, password } = req.body;    // Extracting email and password from the request body
    try {
        const user = await User.findOne({ email }); // Searching for a user with the provided email

        // If no user is found, return a 404 response
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ "msg": "User not found" });
        }

        // Checking if the provided password matches the stored password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Generating a JWT token with the user's email
        JWT.sign({ emailid: email }, JWT_SECRET_KEY, (error, token) => {
            if (error) {
                console.log("Error in generating token", error);
                res.status(400).json({ "msg": "Error in generating token" });
                return;
            }

            res.cookie("token", token);    // Storing the token in a cookie            
            res.status(200).json({ msg: "User logged in successfully", user: user.name, token }); // Sending a success response with the user's name
        });
    } catch (e) {
        console.log(e);
        console.log("Error logging user");
        res.status(400).json({ "msg": "Error logging user" });
    }
};

// ------------------------- User Registration -------------------------
userController.userRegister = async (req, res) => {

    const { name, email, phone, password, address } = req.body;     // Extracting user details from the request body
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ name, email, phone, password: hashedPassword, address }); // Creating a new user instance with the provided details
        const newUser = await user.save(); // Saving the user to the database

        console.log("User saved successfully");
        res.status(200).json({ "msg": "User saved successfully", user: newUser });
    } catch (e) {
        console.log(e);
        console.log("Error adding user");
        res.status(400).json({ "msg": "Error adding user" });
    }
};

// ------------------------- Get Users -------------------------


userController.getUser = async (req, res) => {

    // console.log("req👍👍👍👍👍👍👍",req)
    try {
        const user = await User.findOne({ email: req.user.emailid }).select('-__v -password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};



// Exporting the userController to be used in other parts of the application
module.exports = userController;
