import { Router } from "express";
import reviewController from "../controllers/review-controller";
import authentication from "../middleware/autentication-middleware";
import { upload } from "../middleware/multer-upload";

const ReviewRouter = Router();

ReviewRouter.post("/review", authentication, upload.array("images"), reviewController.post);
ReviewRouter.put("/review", authentication, upload.array("images"), reviewController.put);
ReviewRouter.delete("/review", authentication, reviewController.delete);
ReviewRouter.get("/reviews", authentication, reviewController.gets);
ReviewRouter.get("/review", authentication, reviewController.getAllByUserId);

export default ReviewRouter;
