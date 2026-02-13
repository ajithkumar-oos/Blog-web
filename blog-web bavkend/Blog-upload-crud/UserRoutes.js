import express from "express";
import {
  createUser,
  viewAllBlogs,
  deleteBlog,
  addComment,
  deleteComment,
} from "./UserController.js";
import { upload } from "./multer.js";
import { verifyToken } from "./AuthMiddleware.js";
import { verifyAdmin } from "./AdminMiddleware.js";

const router = express.Router();

// Only logged-in users can view blogs
router.get("/viewallblogs", verifyToken, viewAllBlogs);

// Only admin can upload blogs
router.post("/upload", verifyToken, verifyAdmin, upload.single("image"), createUser);

// Only admin can delete blogs
router.delete("/deleteblog/:id", verifyToken, verifyAdmin, deleteBlog);

// Logged-in users can add comments
router.post("/addcomment/:id", verifyToken, addComment);

// Logged-in users can delete their comments
router.delete("/deletecomment/:blogId/:commentId", verifyToken, deleteComment);

export default router;
