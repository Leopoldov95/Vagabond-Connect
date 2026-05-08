// middleware goes here
// middleware always gets used in the routes
import jwt from "jsonwebtoken";
import { config } from "../config";

/**
 * Authentication middleware that validates JWT tokens from the client.
 *
 * Process:
 * 1. Extracts token from Authorization header (format: "Bearer <token>")
 * 2. Determines if token is our custom JWT or Google OAuth token
 * 3. Validates custom JWT using the centralized JWT_SECRET from config
 * 4. For Google tokens, decodes (without verification) to extract user ID
 * 5. Attaches userId to req object for use in controllers
 *
 * Note: Google tokens are decoded without verification. Full verification should
 * be implemented for production use of Google OAuth.
 *
 * @middleware
 * @param {Request} req - Express request with Authorization header
 * @param {Response} res - Express response
 * @param {Function} next - Express next middleware function
 */
const auth = async (req, res, next) => {
  console.log("hello from auth middleware");
  try {
    // Extract token from Authorization header
    // Expected format: "Bearer <token>"
    // due to how headers are handled
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; // checking to see if toke is OUR own token, if it's more than 500 characters, then it the Google Auth's token from the google signin

    let decodedData;

    if (token && isCustomAuth) {
      // Validate custom JWT using the centralized JWT_SECRET from configuration
      // This secret is loaded from environment variables with a fallback for development
      decodedData = jwt.verify(token, config.auth.jwtSecret);

      req.userId = decodedData?.id;
    } else {
      // Handle Google OAuth token
      // Note: This decodes without verification. For production, implement proper
      // Google token verification using Google's public keys
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; // .sub is a google func that diferentiates between users
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export { auth };
