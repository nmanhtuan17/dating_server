import express from "express";
import middleware from "@/middleware/middleware";
import ConversationCtrl from "@/controler/message/conversation.ctrl";

const router = express.Router();

router.get("/getAll", middleware.verifyToken, ConversationCtrl.getAllConversation);
router.post('/create/:id', middleware.verifyToken, ConversationCtrl.createConversation)
export default router;
