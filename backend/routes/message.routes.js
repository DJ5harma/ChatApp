import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/get/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

const messageRouter = router;
export default messageRouter;
