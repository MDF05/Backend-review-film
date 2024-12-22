import { Request, Response } from "express";
import { version } from "../../../package.json";

export default function successResponse(req: Request, res: Response, content: object): void {
  res.status(200).json({
    success: true,
    app: "Review Film",
    author: "Muhammad Dava Fahreza",
    timestamp: new Date().toISOString(),
    version,
    method: req.method,
    protocol: req.protocol,
    hostname: req.hostname,
    url: req.url,
    content,
  });
}
