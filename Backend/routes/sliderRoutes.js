import express from "express";
import Slider from "../models/SliderPhoto.js";
import upload from "../middleware/upload.js";

// const baseUrl = process.env.BASE_URL;
const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const data = await Slider.find();
  res.json(data);
});

// POST (FIXED)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file
  ? req.file.path
  : "";

    const newSlide = new Slider({
      title: req.body.title,
      imageUrl,
    });

    await newSlide.save();
    res.json(newSlide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Slider.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;