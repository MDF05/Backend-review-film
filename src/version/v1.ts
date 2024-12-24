import { Router, Express } from "express";
import AuthRouter from "../v1/routers/auth-router";
import ProfileRouter from "../v1/routers/profile-router";
import ReviewRouter from "../v1/routers/review-router";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../swagger/swagger-output.json";
import swaggerJsDoc from "swagger-jsdoc";
import  bodyParser  from 'body-parser';

  // const CSS_URL =
  //   "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

  const CSS_URL =
    "https://backend-review-film-git-dev-mdf05s-projects.vercel.app/assets/css/swagger.css";

const V1Router = Router();

V1Router.use(AuthRouter);
V1Router.use(ProfileRouter);
V1Router.use(ReviewRouter);




V1Router.use(bodyParser.json()); // to use body object in requests


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "https://nodejs-swagger-api.vercel.app/",
        description: "My API Documentation",
      },
    ],
  },
  // This is to call all the file
  apis: ["src/**/*.js"],
};

const specs = swaggerJsDoc({definition : swaggerDocument, apis: [] });

V1Router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, {customCssUrl : CSS_URL}));

export default V1Router;
