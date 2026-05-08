import express from "express";
import Submission from "../models/Submission.js";

const router = express.Router();

// ================= CREATE SUBMISSION =================
router.post("/", async (req, res) => {
  try {
    const newSubmission = new Submission({
      ...req.body,
      approved: false,
    });

    await newSubmission.save();
    res.status(201).json(newSubmission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= GET ALL SUBMISSIONS =================
router.get("/", async (req, res) => {
  try {
    const data = await Submission.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= GET APPROVED ONLY =================
router.get("/approved", async (req, res) => {
  try {
    const data = await Submission.find({ approved: true }).sort({
      createdAt: -1,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= APPROVE SUBMISSION =================
router.put("/approve/:id", async (req, res) => {
  try {
    const updated = await Submission.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true } // 🔥 IMPORTANT (returns updated data)
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= DELETE SUBMISSION =================
router.delete("/:id", async (req, res) => {
  try {
    await Submission.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;