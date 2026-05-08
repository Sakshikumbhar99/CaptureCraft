import Submission from "../models/Submission.js";

// Create submission
export const createSubmission = async (req, res) => {
  try {
    const submission = new Submission(req.body);
    const saved = await submission.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get approved submissions
export const getApprovedSubmissions = async (req, res) => {
  try {
    const data = await Submission.find({ status: "approved", isAdmin: false })
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAdminImages = async (req, res) => {
  try {
    const data = await Submission.find({ isAdmin: true });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all submissions (admin)
export const getAllSubmissions = async (req, res) => {
  try {
    const data = await Submission.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update submission (approve/reject)
export const updateSubmission = async (req, res) => {
  try {
    const updated = await Submission.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};