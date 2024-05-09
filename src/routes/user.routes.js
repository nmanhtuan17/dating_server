import { Router } from "express";
import {UserCrl} from "@/controler/user/user.crl";
import middleware from "../middleware/middleware";
import {upload} from "@/config/cloudinary/cloudinary.conf";

const router = Router();
router.post('/update',middleware.verifyToken, UserCrl.updateProfile);
router.post('/update-avatar', middleware.verifyToken, upload.single('file'), UserCrl.uploadAvatar);
export default router;
