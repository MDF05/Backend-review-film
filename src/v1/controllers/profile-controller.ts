import { NextFunction, Request, Response } from "express";
import createError from "../utils/create-error";
import successResponse from "../utils/response-succes";
import { ProfileDTO } from "../DTO/profile-DTO";
import profileService from "../services/profile-service";
import cloudinary from "../libs/cloudinary";

class ProfileController {
  async put(req: Request, res: Response, next: NextFunction) {
    /*
        #swagger.consumes = ['multipart/form-data']  
        #swagger.parameters['image'] = {
            in: 'formData',
            type: 'array',
            required: true,
            description: 'Some description...',
            collectionFormat: 'single',
            items: { type: 'file' }
        } */
    /*      #swagger.requestBody = {
              required : true,
              content : {
                  "application/json" : {
                      schema : {
                         $ref : "#/components/schemas/profile schema"
                      }
                  }
              }
          }
        */

    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    try {
      const body: ProfileDTO = req.body;
      const upload = await cloudinary.uploader(req.file as any);

      if (upload) body.image = upload;

      const user = await profileService.put(body);
      successResponse(req, res, { user });
    } catch (err) {
      if (err instanceof Error) next(createError(err.message, 401));
      else next(createError("server error: ", 500));
    }
  }
}

export default new ProfileController();
