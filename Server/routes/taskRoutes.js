// Importing the necessary modules
const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController"); // Importing task-related controllers
const authMiddleware = require("../middleware/authMiddleware"); // Importing the authentication middleware
const router = express.Router(); // Creating an Express router instance

// Route to create a new task (Protected route, requires authentication)
router.post("/", authMiddleware, createTask);
// Route to get all tasks for the authenticated user, with optional status filtering (Protected route)
router.get("/", authMiddleware, getTasks);
// Route to update an existing task by ID (Protected route)
router.put("/:id", authMiddleware, updateTask);
// Route to delete a task by ID (Protected route)
router.delete("/:id", authMiddleware, deleteTask);

// Exporting the router to be used in the main application file
module.exports = router;
