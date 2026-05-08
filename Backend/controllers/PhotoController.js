import Photo from "../models/Photo.js";

// Upload photo (admin)
export const uploadPhoto = async (req, res) => {
  try {
    const photo = new Photo(req.body);
    const saved = await photo.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all photos (gallery)
export const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};