// Importing the required Task model to interact with the database
const Task = require("../models/taskModel");

// Function to create a new task
const createTask = async (req, res) => {
  // Extracting task description from the request body and userId from the authenticated user (decoded JWT)
  const { description } = req.body;
  const userId = req.user.id; // userId extracted from JWT

  try {
    // Creating a new Task instance with userId and description
    const task = new Task({ userId, description });

    // Saving the task to the database
    await task.save();

    // Returning the created task as a JSON response
    res.status(201).json(task);
  } catch (error) {
    // If there's a server error, return a 500 response with an error message
    res.status(500).json({ message: "Server error" });
  }
};

// Function to get all tasks for the authenticated user, optionally filtering by task status
const getTasks = async (req, res) => {
  // Extracting userId from the authenticated user (decoded JWT)
  const userId = req.user.id;

  // Extracting the optional status filter from the request query parameters
  const { status } = req.query;

  try {
    // Finding tasks associated with the userId, and if status is provided, adding it to the filter
    const tasks = await Task.find({ userId, ...(status && { status }) });

    // Returning the list of tasks as a JSON response
    res.json(tasks);
  } catch (err) {
    // If there's a server error, return a 500 response with an error message
    res.status(500).json({ message: "Server error" });
  }
};

// Function to update the status of a task by its ID
const updateTask = async (req, res) => {
  // Extracting the task ID from the request parameters and the new status from the request body
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Finding the task by its ID and updating its status, returning the updated task
    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });

    // Returning the updated task as a JSON response
    res.json(task);
  } catch (err) {
    // If there's a server error, return a 500 response with an error message
    res.status(500).json({ message: "Server error" });
  }
};

// Function to delete a task by its ID
const deleteTask = async (req, res) => {
  // Extracting the task ID from the request parameters
  const { id } = req.params;

  try {
    // Finding the task by its ID and deleting it from the database
    await Task.findByIdAndDelete(id);

    // Returning a success message indicating task deletion
    res.json({ message: "Task Completed" });
  } catch (error) {
    // If there's a server error, return a 500 response with an error message
    res.status(500).json({ message: "Server error" });
  }
};

// Exporting the task-related functions to be used in other files
module.exports = { createTask, getTasks, updateTask, deleteTask };
