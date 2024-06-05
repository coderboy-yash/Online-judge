import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import problemRouter from "./routes/problemRouter.js";
import codeRouter from "./routes/codeRouter.js";

const app = express();
app.use(cookieParser());

dotenv.config();
const port = process.env.PORT;
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connection established");
  } catch (err) {
    console.log("error connecting to database: ", err);
  }
};
// middleware

let corsOptions = {
  origin: process.env.CORS_ORIGIN, // Specify the frontend origin
  credentials: true,
};

app.use(cors(corsOptions)); 
// app.use(cookieParser());
app.use(express.json());
// app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("hello from api");
});
app.use("/user",userRouter)
app.use("/problem",problemRouter)
app.use("/code",codeRouter)
// app.get()
app.listen(port, () => {
  connect();
  console.log("listening on port", port);
});