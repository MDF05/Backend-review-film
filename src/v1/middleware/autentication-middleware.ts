import { NextFunction, Request, Response } from "express";
import createError from "../utils/create-error";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authentication(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return next(createError("Token not provided", 401));

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string);
    res.locals.user = verifyToken;
    next();
  } catch (err: unknown) {
    if (err instanceof Error) next(createError(err.message, 402));
    else next(createError("sorry, server erorr", 502));
  }
}
