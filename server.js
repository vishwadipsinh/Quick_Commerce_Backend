const libExpress = require("express"); // Importing the Express library
const bodyParser = require("body-parser"); // Importing the body-parser middleware to handle JSON request bodies
const userRouter = require("./routers/User.router.js"); // Importing the user router, which handles routes related to user operations
const Util = require("./utils.js"); // Importing a utility module (assumed to contain helper functions)
const cors = require("cors"); // Importing the CORS (Cross-Origin Resource Sharing) middleware to allow cross-origin requests



const app = libExpress(); // Creating an Express application instance
// app.use(cors()); // Enabling CORS for the application, allowing API access from different origins

app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true
}));

app.use(bodyParser.json()); // Enabling body-parser to parse JSON request bodies

// Middleware to log the HTTP method of incoming requests
app.use((req, res, next) => {
  console.log(req.method); // Logs the request method (GET, POST, etc.)
  next(); // Passes control to the next middleware or route handler
});

app.use("/user", userRouter); // Mounting the user router to handle requests at the '/user' route

// Starting the server on port 3000 and logging a message once it's running
app.listen(3000, () => {
  console.log(`server is started on port 3000`);
});
