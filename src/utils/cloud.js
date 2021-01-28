/* eslint-disable */
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';


dotenv.config();

cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});
export const uploadToCloud = async (file, res) => {
  try {
    const profilePicture = await cloudinary.uploader.upload(file.path, {
      folder: 'profile_pictures',
      use_filename: true,
    });
    return profilePicture;
  } catch (error) {
    res.status(500).send(error.message)
  }
};