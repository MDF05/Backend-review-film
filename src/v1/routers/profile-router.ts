import { Router } from "express";
import profileController from "../controllers/profile-controller";
import authentication from "../middleware/autentication-middleware";
import { upload } from "../middleware/multer-upload";

const ProfileRouter = Router();

ProfileRouter.put("/profile", authentication, upload.single("image"), profileController.put);

export default ProfileRouter;
