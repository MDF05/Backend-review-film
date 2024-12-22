import { NextFunction, Request, Response } from "express";
import createError from "../utils/create-error";
import successResponse from "../utils/response-succes";
import cloudinary from "../libs/cloudinary";
import { ReviewDTO } from "../DTO/review-DTO";
import reviewServices from "../services/review-services";

class ReviewController {
  async post(req: Request, res: Response, next: NextFunction) {
    /*
        #swagger.consumes = ['multipart/form-data']  
        #swagger.parameters['images'] = {
            in: 'formData',
            type: 'array',
            required: true,
            description: 'Some description...',
            collectionFormat: 'multi',
            items: { type: 'file' }
        } */
    /*      #swagger.requestBody = {
              required : true,
              content : {
                  "application/json" : {
                      schema : {
                         $ref : "#/components/schemas/review schema"
                      }
                  }
              }
          }
        */

    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    try {
      const body: ReviewDTO = req.body;
      const id = res.locals.user.id;
      body.userId = id;
      let upload: string[] | null = null;

      if (req.files) upload = await cloudinary.multipleUploader(req.files as any);
      if (upload) body.images = upload;

      const user = await reviewServices.create(body);
      successResponse(req, res, { user });
    } catch (err) {
      if (err instanceof Error) next(createError(err.message, 401));
      else next(createError("server error: ", 500));
    }
  }
  async put(req: Request, res: Response, next: NextFunction) {
    /*
        #swagger.consumes = ['multipart/form-data']  
        #swagger.parameters['images'] = {
            in: 'formData',
            type: 'array',
            required: true,
            description: 'Some description...',
            collectionFormat: 'multi',
            items: { type: 'file' }
        } */
    /*      #swagger.requestBody = {
              required : true,
              content : {
                  "application/json" : {
                      schema : {
                         $ref : "#/components/schemas/review schema"
                      }
                  }
              }
          }
        */

    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    try {
      const body: ReviewDTO = req.body;
      const id = res.locals.user.id;
      body.userId = id;
      let upload: string[] | null = null;

      if (req.files) upload = await cloudinary.multipleUploader(req.files as any);
      if (upload) body.images = upload;

      const user = await reviewServices.update(body);
      successResponse(req, res, { user });
    } catch (err) {
      if (err instanceof Error) next(createError(err.message, 401));
      else next(createError("server error: ", 500));
    }
  }
  async gets(req: Request, res: Response, next: NextFunction) {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    try {
      const reviews = await reviewServices.getAll();
      successResponse(req, res, { reviews });
    } catch (err) {
      if (err instanceof Error) next(createError(err.message, 401));
      else next(createError("server error: ", 500));
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    try {
      const reviewId = req.query.reviewId;

      const reviews = await reviewServices.delete(`${reviewId}`);
      successResponse(req, res, { reviews });
    } catch (err) {
      console.log(err);
      if (err instanceof Error) next(createError(err.message, 401));
      else next(createError("server error: ", 500));
    }
  }
  async getAllByUserId(req: Request, res: Response, next: NextFunction) {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    try {
      const userId = res.locals.user.id;

      const review = await reviewServices.getAllByUserId(userId);
      successResponse(req, res, review);
    } catch (err) {
      if (err instanceof Error) next(createError(err.message, 401));
      else next(createError("server error: ", 500));
    }
  }
}

export default new ReviewController();
