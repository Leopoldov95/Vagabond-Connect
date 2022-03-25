import express from "express";
import mongoose, { ConnectOptions, mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
//import socket from "socket.io";

//import logging from "./config/logging";
import userRoutes from "./routes/users";
import postsRoutes from "./routes/posts";
import messageRoutes from "./routes/message";
//const NAMESPACE = "Server";
//let CONNECTION_URL = process.env["CONNECTION_URL"];
const socket = require("socket.io");
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

// socket.io configure
// so socket.io is INDEPENDANT of Mongodb and operates without it, it only tracks changes from the data it recieves DIRECTLY from the frontend and not from any mongodb databse...
const io = socket(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  // during the socket setup process, we want to grab both usersId
  // should we always connect the two or only one once a user is online?
  socket.on("setup", (userId) => {
    socket.join(userId); // apparently this is an arbitrary value, might need need target message db id
    console.log(userId);
    socket.emit("connected");
  });

  // joins the chat

  // listends to new messages
  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved;
  });

  socket.on("disconnect", () => {
    console.log("User has left");
  });
});

//global.onlineUsers = new Map();

// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     global.onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = global.onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });
// io.on('connection', (socket) => {
//   Msg.find().then(result => {
//     socket.emit('output-messages', result)
// })
// console.log('a user connected');
// socket.emit('message', 'Hello world');
// socket.on('disconnect', () => {
//     console.log('user disconnected');
// });
// socket.on('chatmessage', msg => {
//     const message = new Msg({ msg });
//     message.save().then(() => {
//         io.emit('message', msg)
//     })

// })
// })

//const clients = socket.listen(PORT).sockets

// mongoose
//   .connect(`${process.env.CONNECTION_URL}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   } as ConnectOptions)
//   .then(() => {
//     app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
//   })
//   .catch((err) => console.log(err.message));

// io.on("connection", (socket) => {
//   console.log(socket);
// });
//mongoose.set("useFindAndModify", false);
/* MAY WANT TO DELETE THIS!! */

/* Logging */
/* app.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
  ); */

// res.on fires when finished
/*  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  });
  next();
});
 */
/* Parse the request */
/* app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()); */

/* Rules of our API */
/* app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, "*");
  res.header(
    `Access-Control-Allow-Origin`,
    `Origin, X-Requested-With, Content-Type, Accept, Authorization`
  );

  if (req.method === "OPTIONS") {
    res.header(`Access-Control-Allow-Origin`, "GET PATCH DELETE POST PUT");
    return res.status(200).json({});
  }
  next();
});
 */
/* Routes */

/* Eror Handling */
/* app.use((req, res, next) => {
  const error = new Error("not found");

  return res.status(404).json({
    message: error.message,
  });
});

 */
