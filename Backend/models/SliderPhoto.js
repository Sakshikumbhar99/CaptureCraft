import mongoose from "mongoose";

const sliderPhotoSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("SliderPhoto", sliderPhotoSchema);