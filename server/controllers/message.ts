import mongoose from "mongoose";
import Users from "../models/users";
import { Request, Response } from "express";

// this will feth the messaging thread for the slected user
export const fetchUserMessage = (req: Request, res: Response) => {};
// this will post a new message to the thread
export const postMessage = (req: Request, res: Response) => {};
// this will delete the entire message thread
export const deleteMessages = (req: Request, res: Response) => {};
