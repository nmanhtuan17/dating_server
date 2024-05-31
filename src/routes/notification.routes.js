import express from "express";
import middleware from "@/middleware/middleware";
import NotificationCtrl from "@/controler/notification/notification.ctrl";

const router = express.Router();

router.get("/get-all", middleware.verifyToken, NotificationCtrl.getAll);

export default router;
