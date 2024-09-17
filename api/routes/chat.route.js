import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import {
  getChats,
  getChat,
  addChat,
  readChat,
  getChatsOnList,
} from "../controllers/chat.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/",verifyToken,getChats);
router.get("/chatonlist/",verifyToken,getChatsOnList);
router.get("/:id", verifyToken, getChat);
router.post("/", verifyToken, addChat);
router.put("/read/:id", verifyToken, readChat);
//router.get("/profilePosts",verifyToken,profilePosts);
export default router;
