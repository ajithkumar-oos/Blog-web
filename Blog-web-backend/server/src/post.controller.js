import Post from "./Post.js";


export const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("author", "name email role")
    .sort({ createdAt: -1 });
  res.json(posts);
};

export const getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "name email role");
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

export const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const newPost = await Post.create({
      title,
      content,
      tags: tags ? JSON.parse(tags) : [],
      image: req.file ? req.file.filename : "",
      author: req.user._id
    });

    res.status(201).json({ message: "Post created ✅", post: newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // only owner OR admin
    if (String(post.author) !== String(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    post.title = title ?? post.title;
    post.content = content ?? post.content;
    post.tags = tags ? JSON.parse(tags) : post.tags;

    if (req.file) post.image = req.file.filename;

    await post.save();
    res.json({ message: "Post updated ✅", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  // only owner OR admin
  if (String(post.author) !== String(req.user._id) && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not allowed" });
  }

  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted ✅" });
};
