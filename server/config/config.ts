import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "SUPERUSER";

const SERVER_HOSTNAME = process.env.SERVER_PORT || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  server: SERVER,
};

export default config;
