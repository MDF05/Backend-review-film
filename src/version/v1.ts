import { Router, Express } from "express";
import AuthRouter from "../v1/routers/auth-router";
import ProfileRouter from "../v1/routers/profile-router";
import ReviewRouter from "../v1/routers/review-router";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../swagger/swagger-output.json";
import swaggerJsDoc from "swagger-jsdoc";

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const V1Router = Router();

V1Router.use(AuthRouter);
V1Router.use(ProfileRouter);
V1Router.use(ReviewRouter);



const specs = swaggerJsDoc({definition : swaggerDocument, apis: ["src/**/*.js"] });
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

V1Router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, { customCssUrl: CSS_URL }));

export default V1Router;
