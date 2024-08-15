import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import {
  getChats,
  getChat,
  addChat,
  readChat,
} from "../controllers/chat.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getChats);
router.put("/:id", verifyToken, getChat);
router.delete("/", verifyToken, addChat);
router.put("/read", verifyToken, readChat);
// router.get("/profilePosts",verifyToken,profilePosts);
export default router;
