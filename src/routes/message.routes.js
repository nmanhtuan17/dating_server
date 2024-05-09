import express from "express";
import middleware from "@/middleware/middleware";
import MessageCtrl from "@/controler/message/message.ctrl";

const router = express.Router();

router.get("/:id", middleware.verifyToken, MessageCtrl.getMessages);
router.post("/send/:id", middleware.verifyToken, MessageCtrl.sendMessage);

export default router;
