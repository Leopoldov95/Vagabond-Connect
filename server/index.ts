import express from "express";
import mongoose, { ConnectOptions, mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import postsRoutes from "./routes/posts";
import messageRoutes from "./routes/message";

//const socket = require("socket.io");
const app = express();
dotenv.config();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" }));

const PORT = process.env.PORT || 5000;
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.CONNECTION_URL);

app.get("/", (req, res) => {
  res.send("Hello To Vaggabond Connect API");
});
app.use("/users", userRoutes);
app.use("/posts", postsRoutes);
app.use("/message", messageRoutes);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
});

////// FUTURE FEATURE, MESSAGING ///////

// // socket.io configure
// // so socket.io is INDEPENDANT of Mongodb and operates without it, it only tracks changes from the data it recieves DIRECTLY from the frontend and not from any mongodb databse...
// const io = socket(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("connected to socket.io");

//   // during the socket setup process, we want to grab both usersId
//   // should we always connect the two or only one once a user is online?
//   socket.on("setup", (userId) => {
//     socket.join(userId); // apparently this is an arbitrary value, might need need target message db id
//     console.log(userId);
//     socket.emit("connected");
//   });

//   // joins the chat
//   socket.on("join room", (roomId) => {
//     console.log(`User has joined room:  ${roomId}`);
//   });
//   // listends to new messages
//   socket.on("new message", (newMessageRecieved) => {
//     let chat = newMessageRecieved;
//     // may want to add a checker if there are valid users
//     chat.users.forEach((userId) => {
//       // If I sent the message, no need to emit on my end
//       if (userId === newMessageRecieved.createdBy) return;
//       socket.in(userId).emit("message Recieved", newMessageRecieved);
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("User has left");
//   });
// });
