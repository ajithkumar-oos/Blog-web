import express from "express";
import multer from "multer";
import path from "path";

import auth from "./auth.js";
import {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost
} from "./post.controller.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

const upload = multer({ storage, fileFilter });

router.get("/", getAllPosts);
router.get("/:id", getSinglePost);

router.post("/", auth, upload.single("image"), createPost);
router.put("/:id", auth, upload.single("image"), updatePost);
router.delete("/:id", auth, deletePost);

export default router;
