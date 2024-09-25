const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes"); // User registration and login routes
const taskRoutes = require("./routes/taskRoutes"); // Task-related routes (CRUD operations)

dotenv.config(); // Load environment variables

const app = express(); // Initialize the express application

// Middleware to parse incoming JSON requests
app.use(express.json());

//connect to MOngoDB using the connection string from envvironment variables
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopolgy: true,
  })
  .then(() => console.log("MongoDB connected")) // Log Success message
  .catch((err) => console.log(err)); // Log connection error

// Register route handlers for user and task routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Start the server and listen on a specific port
const PORT = process.env.PORT || 5000; // Default to port 5000 if env is missing
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log the server start message
});
