import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import postsRoutes from "./routes/posts";
import messageRoutes from "./routes/message";
import {
  setSession,
  addNewUser,
  removeUser,
  typingNotification,
} from "./socket";
import { config } from "./config";

// Load environment variables before any other initialization
// This must happen before config is imported
dotenv.config();

// Initialize Express app and HTTP server
const socket = require("socket.io");
const app = express();
const server = http.createServer(app);

// Configure CORS using centralized config
// In development, accepts all origins. In production, should be restricted
// via CORS_ORIGIN environment variable for security.
const corsOptions = {
  origin: config.cors.origin,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" }));

app.get("/", (req, res) => {
  res.send("Hello To Vaggabond Connect API");
});
app.use("/users", userRoutes);
app.use("/posts", postsRoutes);
app.use("/message", messageRoutes);

// Connect to MongoDB using centralized configuration
// Configuration is validated at startup, so connectionUrl is guaranteed to exist
mongoose
  .connect(
    config.mongodb.connectionUrl,
    config.mongodb.connectionOptions as ConnectOptions,
  )
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });

// // so socket.io is INDEPENDANT of Mongodb and operates without it, it only tracks changes from the data it recieves DIRECTLY from the frontend and not from any mongodb databse...
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["PUT", "GET", "PATCH", "POST", "DELETE", "OPTIONS"],
    credentials: false,
  },
  transports: ["polling"],
});

// Connection handler for real-time socket communication
// Tracks online users and broadcasts events to specific clients
io.on("connection", (socket) => {
  setSession(io, socket); // defines the session in another file wo we can use socket events externally
  console.log("connected to socket.io");
  // during the socket setup process, we want to grab both usersId

  socket.on("newUser", (userId) => {
    addNewUser(userId, socket.id); // we are getting the Socket object as a result of the on socket connection
  });

  socket.on("typing", (data) => {
    typingNotification(data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(`${socket.id} has left the session`);
  });
});

// Start server using centralized port configuration
server.listen(config.server.port, () => {
  console.log(
    `Server listening on port ${config.server.port} (${config.server.nodeEnv} environment)`,
  );
});
