// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: "YOUR_CLOUD_NAME",
//   api_key: "YOUR_API_KEY",
//   api_secret: "YOUR_API_SECRET"
// });

// export default cloudinary;

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;