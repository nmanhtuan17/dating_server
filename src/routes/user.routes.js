import { Router } from "express";
import {UserCrl} from "../controler/user/user.crl";
import middleware from "../middleware/middleware";
import {uploadCloud} from "../config/cloudinary/cloudinary.conf";

const router = Router();
router.post('/update',middleware.verifyToken, UserCrl.updateProfile);
router.post('/update-avatar', middleware.verifyToken, uploadCloud.single('file'), UserCrl.uploadImage);
export default router;
