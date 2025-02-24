import express from "express";
import cors from "cors";  // Import CORS
import userroutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allows sending cookies
  })
);


app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/github")
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.log("MONGODB ERROR =", e));

// Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/user", userroutes);

// Start Server
app.listen(8000, () => {
  console.log("Server started at port 8000");
});
