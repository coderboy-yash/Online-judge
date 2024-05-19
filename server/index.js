import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
// import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import problemRouter from "./routes/problemRouter.js";

const app = express();

dotenv.config();
const port = 3000;
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
  credentials: true,
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
// app.use(cookieParser());
app.use(express.json());
// app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("hello from api");
});
app.use("/login",userRouter)
app.use("/problem",problemRouter)
// app.get()
app.listen(port, () => {
  connect();
  console.log("listening on port", port);
});