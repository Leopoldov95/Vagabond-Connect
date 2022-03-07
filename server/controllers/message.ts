import mongoose from "mongoose";
//import Users from "../models/users";
import Messages from "../models/messages";
import Users from "../models/users";
import { Request, Response } from "express";

// this will feth the messaging thread for the slected user
export const fetchUserMessage = async (req: any, res: Response) => {
  console.log("I am being called twice from the client, please fix me");
  const { id: _id } = req.params; // targeted user id
  const userId = req.userId; // authenticated user ID
  try {
    // for now, since we had to go through multiple authenitcaed barriers to get here, we can keep security minimal
    // ensure that validated user is logged in
    if (!userId) return res.json({ message: "Unauthenticated" });
    // ensrue that we have a valid id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No User with that ID");
    }
    const userMessages: any = await Messages.find({ ownderId: userId });
    const { allMessages } = userMessages[0];

    console.log(allMessages);

    if (allMessages) {
      return allMessages[_id]
        ? res.json(allMessages[_id])
        : res.json({ message: "No messages with this user" });
    }
    return res.json({ message: "no messages" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
// this will post a new message to the thread
export const postMessage = async (req: any, res: Response) => {
  const { id: targetId } = req.params;
  const userId = req.userId; // authenticated user ID
  const data = req.body;
  let userMessageThread = await Messages.find({ ownerId: userId });
  let targetMessageThread = await Messages.find({ ownerId: targetId });
  if (!userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(targetId)) {
    return res.status(404).send("No User with that ID");
  }
  // check if  a message thread already exists, if not create a new one
  // initiate a message threead for first ime use
  if (userMessageThread.length < 1) {
    await Messages.create({
      ownerId: userId,
    });
    // will have to reassign value after new thread is created
    userMessageThread = await Messages.find({ ownerId: userId });
  }
  if (targetMessageThread.length < 1) {
    await Messages.create({
      ownerId: targetId,
    });
    targetMessageThread = await Messages.find({ ownerId: targetId });
  }

  let userProp = userMessageThread[0].allMessages[`${targetId}`];
  let targetProp = targetMessageThread[0].allMessages[`${userId}`];
  // push message to user message thread
  if (!userProp) {
    userProp = [];
  }
  if (!targetProp) {
    targetProp = [];
  }

  userProp.push({
    createdAt: new Date(),
    messageOwner: userId,
    message: data.message,
  });
  targetProp.push({
    createdAt: new Date(),
    messageOwner: userId,
    message: data.message,
  });
  let userToUpdate = {};
  userToUpdate[`allMessages.${targetId}`] = userProp;
  let targetToUpdate = {};
  targetToUpdate[`allMessages.${userId}`] = targetProp;
  const result = await Messages.findOneAndUpdate(
    { ownerId: userId },
    { $set: { ...userToUpdate } },
    { new: true }
  );
  await Messages.findOneAndUpdate(
    { ownerId: targetId },
    { $set: { ...targetToUpdate } },
    { new: true }
  );
  // push message thread to target thread

  // return USER thread to client
  res.json(result.allMessages[targetId]);
};
// this will delete the entire message thread
export const deleteMessages = async (req: any, res: Response) => {
  const { id: _id } = req.params;
  const userId = req.userId;
};
