// This file will serve as a helper file to handle cloudinary uploads, edit, and deletion
const { cloudinary } = require("../utils/cloudinary.js");

// upload IMG to cloudinary
const uploadCloudinary = async (file) => {
  return await cloudinary.uploader.upload(file, {
    upload_preset: "socialmediaimgapi",
  });
};

const deleteCloudinaryImg = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
module.exports = { uploadCloudinary, deleteCloudinaryImg };
