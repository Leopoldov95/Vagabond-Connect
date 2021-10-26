import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import logging from "./config/logging";
import userRoutes from "./routes/users";
//const NAMESPACE = "Server";
const app = express();
dotenv.config();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("Hello To Vaggabond Connect API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  } as ConnectOptions)
  .then(() => app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
  .catch((err) => console.log(err.message));

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
