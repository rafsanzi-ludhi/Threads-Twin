import mongoose from "mongoose";

// Define the schema for the community
const communitySchema = new mongoose.Schema({
  // A unique identifier for each community
  id: {
    type: String, // Data type is String
    required: true, // This field is mandatory
  },
  // A unique username for the community
  username: {
    type: String, // Data type is String
    unique: true, // This field must be unique among all communities
    required: true, // This field is mandatory
  },
  // The display name of the community
  name: {
    type: String, // Data type is String
    required: true, // This field is mandatory
  },
  // The image URL for the community (optional)
  image: String,
  // The bio/description of the community (optional)
  bio: String,
  // ID of the user who created the community
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // Data type is Object ID from MongoDB
    ref: "User", // References the User model
  },
  // Array of threads that belong to the community
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId, // Data type is Object ID from MongoDB
      ref: "Thread", // References the Thread model
    },
  ],
  // Array of members that are part of the community
  members: [
    {
      type: mongoose.Schema.Types.ObjectId, // Data type is Object ID from MongoDB
      ref: "User", // References the User model
    },
  ],
});

// Create a new Mongoose model called 'Community', or use the existing one if it already exists
const Community =
  mongoose.models.Community || mongoose.model("Community", communitySchema);

// Export the Community model so it can be used in other parts of the application
export default Community;
