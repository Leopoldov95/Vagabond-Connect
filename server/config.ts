/**
 * Centralized Configuration Management
 *
 * This module provides typed, validated access to all environment variables
 * required by the application. Configuration is validated on startup, preventing
 * runtime failures caused by missing environment variables.
 *
 * All sensitive values (database URLs, secrets, etc.) are loaded from environment
 * variables and centralized here, eliminating scattered hardcoded strings across
 * controllers, middleware, and socket handlers.
 *
 * Usage:
 *   import { config } from './config';
 *   const dbUrl = config.mongodb.connectionUrl;
 *   const jwtSecret = config.auth.jwtSecret;
 */

interface Config {
  mongodb: {
    connectionUrl: string;
    connectionOptions: {
      useNewUrlParser: boolean;
      useUnifiedTopology: boolean;
    };
  };
  server: {
    port: number;
    nodeEnv: "development" | "production" | "test";
  };
  auth: {
    jwtSecret: string;
    jwtExpiresIn: string;
  };
  cors: {
    origin: string | string[];
    credentials: boolean;
  };
}

/**
 * Validates that a required environment variable exists.
 * Throws an error with a clear message if the variable is missing.
 *
 * @param envVar - The environment variable name
 * @returns The environment variable value
 * @throws Error if the variable is not set
 */
function validateRequiredEnv(envVar: string): string {
  const value = process.env[envVar];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${envVar}. ` +
        `Please check your .env file or environment configuration.`,
    );
  }
  return value;
}

/**
 * Loads configuration from environment variables with validation and defaults.
 * Called once at application startup to catch configuration errors early.
 *
 * @returns Typed configuration object
 */
export function loadConfig(): Config {
  // Validate required environment variables
  const connectionUrl = validateRequiredEnv("CONNECTION_URL");

  // Load optional variables with sensible defaults
  const port = parseInt(process.env.PORT || "5000", 10);
  const nodeEnv = (process.env.NODE_ENV || "development") as
    | "development"
    | "production"
    | "test";

  // JWT secret defaults to a hardcoded value for development/testing,
  // but should be overridden in production via environment variable.
  // In production, ensure JWT_SECRET is set in your deployment configuration.
  const jwtSecret = process.env.JWT_SECRET || "vagabondtoken";

  // CORS configuration
  // In development: allow all origins (*)
  // In production: should be restricted to specific domains via CORS_ORIGIN env var
  const corsOrigin = process.env.CORS_ORIGIN || "*";

  return {
    mongodb: {
      connectionUrl,
      connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
    server: {
      port,
      nodeEnv,
    },
    auth: {
      jwtSecret,
      jwtExpiresIn: "3h",
    },
    cors: {
      origin: corsOrigin,
      credentials: false,
    },
  };
}

// Load and export configuration on module load
// This ensures configuration errors are caught immediately at startup
export const config = loadConfig();
