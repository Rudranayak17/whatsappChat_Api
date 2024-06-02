import { config } from "dotenv";
import express, { Request, Response } from "express";
import connectDB from "./utils/feature.js";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./router/user.js";
const app = express();
config();
const mongoURI = process.env.MONGO_URI!

connectDB(mongoURI)
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"))
app.use("/api/v1/users", userRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Server is Working");
});
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log("port is listening on port " + "http://localhost:" + process.env.PORT)
});
