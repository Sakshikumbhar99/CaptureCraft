// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import connectDB from "./config/db.js";
// import submissionRoutes from "./routes/submissionRoutes.js";
// import photoRoutes from "./routes/photoRoutes.js";
// import sliderRoutes from "./routes/sliderRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";

// dotenv.config();
// connectDB();

// const aboutRoutes = require("./routes/aboutRoutes");

// app.use("/api/about", aboutRoutes);

// const app = express();
// // ✅ MIDDLEWARE
// app.use(cors());
// app.use(express.json());

// // ✅ STATIC FOLDER
// app.use("/uploads", express.static("uploads"));

// // ✅ ROUTES
// app.use("/api/upload", uploadRoutes);
// app.use("/api/photos", photoRoutes);
// app.use("/api/submissions", submissionRoutes);
// app.use("/api/slider", sliderRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/about", aboutRoutes);
// // TEST
// app.get("/", (req, res) => {
//   res.send("API running 🚀");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });




import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

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