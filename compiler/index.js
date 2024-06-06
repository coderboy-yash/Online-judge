import express from "express"
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import codeRouter from "./routes/codeRouter.js";

const app = express()
dotenv.config();
const port = process.env.PORT;



let corsOptions = {
    origin: "*", 
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello from compiler api");
});
app.use("/code",codeRouter);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connection established");
    } catch (err) {
        console.log("error connecting to database: ", err);
    }
};
app.listen(port, () => {
    connect();
    console.log("listening on port", port);
});