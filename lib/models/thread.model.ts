// Import the mongoose library for MongoDB interaction
import mongoose from "mongoose";

// Define the schema for a thread in a discussion platform
const threadSchema = new mongoose.Schema({
  // The content of the thread (required)
  text: {
    type: String,
    required: true,
  },
  // The ID of the user who authored the thread (required)
  // This references the User model
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // The ID of the community where the thread is posted (optional)
  // This references the Community model
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  // The date and time when the thread was created
  // Defaults to the current date and time
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // The ID of the parent thread if this thread is a reply (optional)
  parentId: {
    type: String,
  },
  // Array of child thread IDs if this thread has replies
  // This references the Thread model itself for nested conversations
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

// Create the Thread model if it doesn't already exist, based on the defined schema
const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

// Export the Thread model for use in other parts of the application
export default Thread;
