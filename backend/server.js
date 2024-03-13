import express from "express";

import dotenv from "dotenv";
import connectToDB from "./db/connectToDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT: ${process.env.PORT}`);
    connectToDB();
});
