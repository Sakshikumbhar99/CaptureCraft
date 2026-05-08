import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    // title: String,
    contact: String,
    category: String,
    imageUrl: String,
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);