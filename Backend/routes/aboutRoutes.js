import express from "express";
import About from "../models/About.js";

const router = express.Router();


// ✅ GET About (for frontend)
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





// ✅ CREATE or UPDATE About (Admin)
router.put("/", async (req, res) => {
  try {
    const data = req.body;

    let about = await About.findOne();

    if (!about) {
      about = new About(data);
    } else {
      about.title = data.title;
      about.description1 = data.description1;
      about.description2 = data.description2;
      about.description3 = data.description3;
      about.quote = data.quote;

      // ONLY update image if provided
      if (data.imageUrl && data.imageUrl !== "") {
        about.imageUrl = data.imageUrl;
      }
    }

    await about.save();

    res.json({ message: "Updated", about });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;