import { Router } from "express";
import {UserCrl} from "../controler/user/user.crl";
import middleware from "../middleware/middleware";

const router = Router();
router.post('/update',middleware.verifyToken, UserCrl.updateProfile);
router.post('/upload-image',middleware.verifyToken, UserCrl.uploadImage);
export default router;
