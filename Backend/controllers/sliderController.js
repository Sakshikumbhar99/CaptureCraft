import SliderPhoto from "../models/SliderPhoto.js";

// Upload slider photo
export const uploadSliderPhoto = async (req, res) => {
  try {
    const photo = new SliderPhoto(req.body);
    const saved = await photo.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get slider photos (max 6)
export const getSliderPhotos = async (req, res) => {
  try {
    const photos = await SliderPhoto.find().limit(6);
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete slider photo
export const deleteSliderPhoto = async (req, res) => {
  try {
    await SliderPhoto.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};