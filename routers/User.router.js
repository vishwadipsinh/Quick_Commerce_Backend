const libExpress = require('express');// Importing the Express library to create a router
const userController = require('../controllers/User.controller'); // Importing the user controller, which contains the logic for handling user-related requests
const auth = require('../middleware/auth')
const userRouter = libExpress.Router(); // Creating a new router instance using Express


// Defining a route for user login (POST request)
// When a request is made to `/user/login`, the `userLogin` function in `userController` is executed
userRouter.post('/login', userController.userLogin);

// Defining a route for user registration (POST request)
// When a request is made to `/user/register`, the `userRegister` function in `userController` is executed
userRouter.post('/register', userController.userRegister);


userRouter.get('/getuser', auth, userController.getUser);



module.exports = userRouter; // Exporting the router so it can be used in other parts of the application
