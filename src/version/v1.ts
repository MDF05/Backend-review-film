import { Router, Express } from "express";
import AuthRouter from "../v1/routers/auth-router";
import ProfileRouter from "../v1/routers/profile-router";
import ReviewRouter from "../v1/routers/review-router";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../swagger/swagger-output.json";

const V1Router = Router();

V1Router.use(AuthRouter);
V1Router.use(ProfileRouter);
V1Router.use(ReviewRouter);
V1Router.use(
  "/",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  }),
);

export default V1Router;
