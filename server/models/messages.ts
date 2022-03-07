import mongoose, { Schema } from "mongoose";

// creating a new, seperate Schema for messages as I don't want users db to be overly cluttered
const messageSchema = new mongoose.Schema(
  {
    ownerId: { type: String, required: true },
    allMessages: { type: Schema.Types.Mixed, default: {} },
  },
  { minimize: false }
);

export default mongoose.model("message", messageSchema);

// allMessages will look like this;
/* 
{
    "_id123" : [
       {
         createdAt: "date",
         message: "message here",
       },
       {
         createdAt: "date",
         message: "message here",
       },
     ],
    "_id58" : [
       {
         createdAt: "date",
         message: "message here",
       },
       {
         createdAt: "date",
         message: "message here",
       },
     ],
}


*/
