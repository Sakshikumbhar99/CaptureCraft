import express from "express";
import Photo from "../models/Photo.js";
import upload from "../middleware/upload.js";

// const baseUrl = process.env.BASE_URL;
const router = express.Router();

// ================= UPLOAD =================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newPhoto = new Photo({
      title: req.body.title,
      // category: req.body.category || "All",

      category: req.body.category,

      imageUrl: req.file.path,
    });

    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET =================
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= DELETE (FIX THIS) =================
router.delete("/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    await Photo.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
