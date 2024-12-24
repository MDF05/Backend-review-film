import express, { NextFunction, Request, Response } from "express";
import V1Router from "./version/v1";
import createError, { CreateError } from "./v1/utils/create-error";
import { errorResponse } from "./v1/utils/response-error";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
//
const port = process.env.PORT || 3000;
const app = express();

//s
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  }),
);

//
app.use("/api/v1/", V1Router);

//
app.use("/", (req: Request, res: Response, next: NextFunction) => next(createError("PAGE NOT FOUND", 404)));
app.use((err: CreateError, req: Request, res: Response, next: NextFunction) => errorResponse(req, res, err));

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
  // createSwagger(app, 3000);
});
