import Blog from "../models/Blog.js";

// CREATE
export const createBlog = async (req, res) => {
  try {
    const newBlog = new Blog({
      title: req.body.title,
      description: req.body.description,
      image: req.file?.filename,
    });
    await newBlog.save();
    res.status(201).json({ message: "Blog created", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error: error.message });
  }
};

// READ
export const viewAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
};

// DELETE
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
};

// ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog.comments.push({ text: req.body.text });
    await blog.save();
    res.status(200).json({ message: "Comment added", comments: blog.comments });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error: error.message });
  }
};

// DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    blog.comments = blog.comments.filter(c => c._id.toString() !== req.params.commentId);
    await blog.save();
    res.status(200).json({ message: "Comment deleted", comments: blog.comments });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error: error.message });
  }
};
