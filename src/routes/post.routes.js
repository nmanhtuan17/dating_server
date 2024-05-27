import { Router } from "express";
import middleware from "../middleware/middleware";
import { upload } from "@/config/cloudinary/cloudinary.conf";
import PostsCtrl from "../controler/posts/posts.ctrl";
import CommentCtrl from "@/controler/comment/comment.ctrl";

const router = Router();
router.get('/getAll', middleware.verifyToken, PostsCtrl.getAll)
router.get('/:postId', middleware.verifyToken, PostsCtrl.getPost)
router.post('/upload', middleware.verifyToken, PostsCtrl.upload);
router.post('/uploadImage', middleware.verifyToken, upload.array('photos'), PostsCtrl.uploadImage)
router.post('/comment/:postId', middleware.verifyToken, CommentCtrl.addComment)
router.post('/like/:postId', middleware.verifyToken, PostsCtrl.likePost)
export default router;
