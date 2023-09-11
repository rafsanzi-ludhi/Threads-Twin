// Import the mongoose library
import mongoose from "mongoose";

// Define the schema for a user
const userSchema = new mongoose.Schema({
  // Unique identifier for the user (required)
  id: {
    type: String,
    required: true,
  },
  // Username (required and must be unique)
  username: {
    type: String,
    unique: true,
    required: true,
  },
  // User's full name (required)
  name: {
    type: String,
    required: true,
  },
  // Profile image URL (optional)
  image: String,
  // Short bio (optional)
  bio: String,
  // Array of thread IDs that the user is associated with
  // (references Thread model)
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  // Boolean indicating whether the user has been onboarded (defaults to false)
  onboarded: {
    type: Boolean,
    default: false,
  },
  // Array of community IDs that the user is a part of
  // (references Community model)
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

// Create a User model if it doesn't already exist, using the defined schema
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
export default User;
