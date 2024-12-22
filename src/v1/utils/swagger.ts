import { Express } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../swagger/swagger-output.json";

export function createSwagger(app: Express, port: number) {
  // swagger page
  app.use(
    "/api/v1",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
      },
    }),
  );
}
