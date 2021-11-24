import Users from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
export const testSignup = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
