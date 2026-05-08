import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  title: String,
  description1: String,
  description2: String,
  description3: String,
  quote: String,
  imageUrl: String,
});

export default mongoose.model("About", aboutSchema);