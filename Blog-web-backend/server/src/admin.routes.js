import express from "express";
import auth from "./auth.js";
import admin from "./admin.js";
import {
  getAllUsers,
  deleteAnyPost,
  toggleBlockUser,
  getAllPostsAdmin
} from "./admin.controller.js";

const router = express.Router();

router.get("/users", auth, admin, getAllUsers);
router.get("/posts", auth, admin, getAllPostsAdmin);
router.delete("/posts/:id", auth, admin, deleteAnyPost);
router.patch("/users/:id/block", auth, admin, toggleBlockUser);

export default router;
