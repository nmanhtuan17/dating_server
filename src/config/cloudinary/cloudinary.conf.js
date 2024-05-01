import {CloudinaryStorage} from "multer-storage-cloudinary";
import multer from 'multer'

const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// const storage = new CloudinaryStorage({
//   cloudinary,
//   allowedFormats: ['jpg', 'png'],
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 2 * 1024 * 1024,
  },
});
