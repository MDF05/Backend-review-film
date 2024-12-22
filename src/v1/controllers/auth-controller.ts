import { NextFunction, Request, Response } from "express";
import createError from "../utils/create-error";
import successResponse from "../utils/response-succes";
import authService from "../services/auth-service";
import { LoginDTO } from "../DTO/login-DTO";
import { RegisterDTO } from "../DTO/register-DTO";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      /*      #swagger.requestBody = {
              required : true,
              content : {
                  "application/json" : {
                      schema : {
                         $ref : "#/components/schemas/login schema"
                      }
                  }
              }
          }
        */

      const body: LoginDTO = req.body;
      const user = await authService.login(body);
      successResponse(req, res, user);
    } catch (err) {
      if (err instanceof Error) next(createError(err.message, 401));
      else next(createError("server error: ", 500));
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body: RegisterDTO = req.body;
      const user = await authService.register(body);
      successResponse(req, res, user);
    } catch (err) {
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("server error: ", 500));
    }
  }
  async checkToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token;
      const user = await authService.checkToken(token);
      successResponse(req, res, user);
    } catch (err) {
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("server error: ", 500));
    }
  }
}

export default new AuthController();
