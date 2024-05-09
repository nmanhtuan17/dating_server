import { Router } from "express";
import middleware from "../middleware/middleware";
import { upload, uploadCloud } from "@/config/cloudinary/cloudinary.conf";
import PostsCtrl from "../controler/posts/posts.ctrl";

const router = Router();
router.post('/upload', middleware.verifyToken, upload.array('photos'), PostsCtrl.upload);
export default router;
