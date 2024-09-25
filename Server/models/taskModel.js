const mongoose = require("mongoose"); // Import mongoose for schema definition

// Define the Task schema with fields for description, status, and user reference
const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User", // Associate the task with a user
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"], // Task status can either be 'pending' or 'completed'
      default: "pending", // Default status is 'pending'
    },
  },
  { timeStamps: true }
);

const Task = mongoose.model("Task", taskSchema);

// Export the Task model for use in other files
module.exports = Task;
