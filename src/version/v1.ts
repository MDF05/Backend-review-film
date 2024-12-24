import { Router, Express } from "express";
import AuthRouter from "../v1/routers/auth-router";
import ProfileRouter from "../v1/routers/profile-router";
import ReviewRouter from "../v1/routers/review-router";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../v1/swagger/swagger-output.json";
import swaggerJsDoc from "swagger-jsdoc";

  // const CSS_URL =
  //   "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

  const CSS_URL =
    "https://backend-review-film-git-dev-mdf05s-projects.vercel.app/assets/css/swagger.css";

const V1Router = Router();

V1Router.use(AuthRouter);
V1Router.use(ProfileRouter);
V1Router.use(ReviewRouter);


// "swagger-ui-express": "^4.6.2" perhatikan swagger version di atas version ini tidak bisa di deploy ke vercel
const specs = swaggerJsDoc({definition : swaggerDocument, apis: [] });
V1Router.use("/", swaggerUI.serve, swaggerUI.setup(specs, {customCssUrl : CSS_URL}));

export default V1Router;
