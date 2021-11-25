import Users from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
const { cloudinary } = require("../utils/cloudinary.js");
export const testSignup = async (req: Request, res: Response) => {
  console.log("hello from the backend");

  try {
    const data = req.body;
    // console.log(data);
    //console.log(cloudinary);
    const uploadIMG = await cloudinary.uploader.upload(data.selectedFile, {
      upload_preset: "socialmediaimgapi",
    });
    //const img = upload.single(data?.selectedFile);

    console.log(uploadIMG);
    // we need secure_url AND public_id
    // qdbhm3vce0onbkuuhfcv
    //console.log(img);
  } catch (error) {
    console.log(error);
  }
};

export const testDestroy = async (req: Request, res: Response) => {
  try {
    await cloudinary.uploader.destroy("qdbhm3vce0onbkuuhfcv");
  } catch (error) {
    console.error(error);
  }
};
