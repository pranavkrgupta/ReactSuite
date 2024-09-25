// Importing the necessary modules
const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController"); // Importing the user-related controllers
const router = express.Router(); // Creating an Express router instance

// Route to register a new user
router.post("/register", registerUser);
// Route to log in an existing user
router.post("/login", loginUser);

// Exporting the router to be used in the main application file
module.exports = router;
