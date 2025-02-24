import express from "express";
import {
  handleGetOneUser,
  handleLogin,
  handleSignup,
} from "../controllers/user.controller.js";
import {
  getallCode,
  getSingleCode,
  handleCommentcodes,
  handleDeleteCode,
  handleSendcode,
} from "../controllers/code.controller.js";
import { checkauth } from "../middlewares/checkauth.js";

const app = express.Router();

//user routes
app.post("/signup", handleSignup);
app.post("/login", handleLogin);
app.get("/profile/:id", handleGetOneUser);

//deploy routes

app.post("/code", checkauth, handleSendcode);
app.get("/getallcodes", checkauth, getallCode);
app.delete("/delete/:id", checkauth, handleDeleteCode);
app.post("/addComment/:id", checkauth, handleCommentcodes);
app.get("/getcode/:id", checkauth, getSingleCode);

export default app;
