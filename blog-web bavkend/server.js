import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import multer from "multer";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ================= USER MODEL ================= */
const AuthUserSchema = new mongoose.Schema(
  {
    username: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const AuthUser = mongoose.model("AuthUser", AuthUserSchema);

/* ================= BLOG MODEL ================= */
const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  comments: [
    {
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Blog = mongoose.model("Blog", BlogSchema);

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

/* ================= AUTH MIDDLEWARE ================= */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};

/* ================= ADMIN CHECK ================= */
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only access" });
  }
  next();
};

/* ================= REGISTER ================= */
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await AuthUser.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new AuthUser({
    username,
    email,
    password: hashedPassword,
    role: email === "ajithkumar2004ganesh@gmail.com" ? "admin" : "user",
  });

  await newUser.save();
  res.json({ message: "Registered successfully" });
});

/* ================= LOGIN ================= */
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await AuthUser.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

/* ================= CREATE BLOG (ADMIN ONLY) ================= */
app.post(
  "/api/upload",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  async (req, res) => {
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
    });

    await blog.save();
    res.json({ message: "Blog uploaded" });
  }
);

/* ================= VIEW BLOGS (LOGGED USERS) ================= */
app.get("/api/viewallblogs", verifyToken, async (req, res) => {
  const blogs = await Blog.find();
  res.json({ Users: blogs });
});

/* ================= DELETE BLOG (ADMIN ONLY) ================= */
app.delete(
  "/api/deleteblog/:id",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  }
);

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
