import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsers } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/get", protectRoute, getUsers);

const userRouter = router;
export default userRouter;
