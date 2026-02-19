import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import RichEditor from "../components/RichEditor";

export default function CreatePost() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("news,tech");
  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("content", content);
      fd.append("tags", JSON.stringify(tags.split(",").map(t => t.trim()).filter(Boolean)));
      if (image) fd.append("image", image);

      await API.post("/posts", fd, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Post Created ✅");
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || "Create failed");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 800 }}>
      <h3>Create Post</h3>

      <form className="card p-3" onSubmit={submit}>
        <label className="form-label">Title</label>
        <input
          className="form-control mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          required
        />

        <label className="form-label">Content</label>
        <RichEditor value={content} onChange={setContent} />

        <label className="form-label mt-3">Tags (comma separated)</label>
        <input
          className="form-control mb-3"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="tech, travel, food..."
        />

        <label className="form-label">Cover Image</label>
        <input
          className="form-control mb-3"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="btn btn-dark">Publish</button>
      </form>
    </div>
  );
}
