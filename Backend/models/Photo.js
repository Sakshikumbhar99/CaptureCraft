import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  title: String,
  category: String,
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Photo", photoSchema);