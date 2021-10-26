import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";

const NAMESPACE = "Sample Controller";

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Sample health check route call`);

  return res.status(200).json({
    mesage: "pong",
  });
};

export { getAllUsers };
