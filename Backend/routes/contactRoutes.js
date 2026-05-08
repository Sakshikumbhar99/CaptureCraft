import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// 📥 GET - Fetch all messages (ADMIN)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// 📩 POST - Save contact message
router.post("/", async (req, res) => {
  try {
    console.log("Incoming Data:", req.body); // 👈 ADD THIS

    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.status(201).json({ message: "Message saved successfully" });

  } catch (error) {
    console.error(error); // 👈 ADD THIS
    res.status(500).json({ error: "Server error" });
  }
});


// ❌ DELETE - Remove message
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Contact.findByIdAndDelete(id);

    res.json({ message: "Message deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;