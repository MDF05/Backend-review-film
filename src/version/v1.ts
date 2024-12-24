import { Router, Express } from "express";
import AuthRouter from "../v1/routers/auth-router";
import ProfileRouter from "../v1/routers/profile-router";
import ReviewRouter from "../v1/routers/review-router";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../swagger/swagger-output.json";
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const V1Router = Router();

V1Router.use(AuthRouter);
V1Router.use(ProfileRouter);
V1Router.use(ReviewRouter);
V1Router.use(
  "/",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, { customCssUrl: CSS_URL })
);

export default V1Router;
