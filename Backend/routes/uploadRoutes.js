import express from "express";
import multer from "multer";

const router = express.Router();

// storage config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// upload route
router.post("/", upload.single("image"), (req, res) => {
  try {
    res.json({
      imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;