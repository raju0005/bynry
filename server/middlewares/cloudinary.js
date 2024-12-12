import cloudinaryModule from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';


dotenv.config();

const cloudinary = cloudinaryModule.v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profile_pictures', 
    allowed_formats: ['jpg', 'jpeg', 'png'], 
  },
});

export { cloudinary, storage };
