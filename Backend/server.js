import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import submissionRoutes from "./routes/submissionRoutes.js";
import photoRoutes from "./routes/PhotoRoutes.js";
import sliderRoutes from "./routes/sliderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";

dotenv.config();
connectDB();

const app = express(); // ✅ MUST be first

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ STATIC FILES
app.use("/uploads", express.static("uploads"));


app.use(cors({
  origin: [
    "https://capturecraft.vercel.app",
    "https://capturecraft-43b8t7edv-sakshikumbhar99s-projects.vercel.app"
  ],
  credentials: true
}));


// ✅ ROUTES
app.use("/api/upload", uploadRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/about", aboutRoutes);



// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});