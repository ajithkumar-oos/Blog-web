import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import RichEditor from "../components/RichEditor";

export default function EditPost() {
  const { id } = useParams();
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await API.get(`/posts/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
      setTags((res.data.tags || []).join(","));
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("content", content);
      fd.append("tags", JSON.stringify(tags.split(",").map(t => t.trim()).filter(Boolean)));
      if (image) fd.append("image", image);

      await API.put(`/posts/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Updated ✅");
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 800 }}>
      <h3>Edit Post</h3>

      <form className="card p-3" onSubmit={submit}>
        <label className="form-label">Title</label>
        <input className="form-control mb-3" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label className="form-label">Content</label>
        <RichEditor value={content} onChange={setContent} />

        <label className="form-label mt-3">Tags</label>
        <input className="form-control mb-3" value={tags} onChange={(e) => setTags(e.target.value)} />

        <label className="form-label">Replace Image (optional)</label>
        <input className="form-control mb-3" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button className="btn btn-warning">Save Changes</button>
      </form>
    </div>
  );
}
