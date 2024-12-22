import { Request, Response } from "express";
import { CreateError } from "./create-error";
import { version } from "../../../package.json";

export function errorResponse(req: Request, res: Response, error: CreateError): void {
  res.status(error.status).json({
    app: "Review Film",
    author: "Muhammad Dava Fahreza",
    timestamp: new Date().toISOString(),
    version,
    method: req.method,
    protocol: req.protocol,
    hostname: req.hostname,
    url: req.url,
    content: {
      name: error.name,
      message: error.message,
      status: error.status,
      success: error.success,
      stack: error.stack,
    },
  });
}
