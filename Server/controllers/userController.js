// Importing the required modules
const User = require("../models/userModel"); // Importing the User model to interact with the database
const jwt = require("jsonwebtoken"); // Importing JWT to create authentication tokens
const bcrypt = require("bcryptjs"); // Importing bcrypt for password hashing and comparison

// Function to register a new user
const registerUser = async (req, res) => {
  // Extracting username and password from the request body
  const { username, password } = req.body;

  try {
    // Checking if a user with the same username already exists in the database
    const userExists = await User.findOne({ username });
    if (userExists) {
      // If user exists, return a 400 response with an error message
      return res.status(400).json({ message: "User already exists" });
    }

    // Creating a new user instance with the username and password provided
    const user = new User({ username, password });

    // Saving the new user to the database
    await user.save();

    // Return a success response with a message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // If there's a server error, return a 500 response with an error message
    res.status(500).json({ message: "Server error" });
  }
};

// Function to log in an existing user
const loginUser = async (req, res) => {
  // Extracting username and password from the request body
  const { username, password } = req.body;

  try {
    // Finding the user in the database by their username
    const user = await User.findOne({ username });
    if (!user) {
      // If user is not found, return a 400 response with an error message
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Comparing the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If passwords don't match, return a 400 response with an error message
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Creating a JWT token with the user's ID, which expires in 1 hour
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Sending the token back to the client
    res.json({ token });
  } catch (error) {
    // If there's a server error, return a 500 response with an error message
    res.status(500).json({ message: "Server error" });
  }
};

// Exporting the registerUser and loginUser functions to be used in other files
module.exports = { registerUser, loginUser };
