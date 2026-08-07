import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();


router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

// This route is used to send a message to the selected user
// The message is sent to the socket server and then to the receiver
router.post("/send/:id", protectRoute, sendMessage);

export default router;
