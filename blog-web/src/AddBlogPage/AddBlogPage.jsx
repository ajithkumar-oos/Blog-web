import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "https://personal-blog-web-backend.onrender.com";

function BlogCards() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, src: "", isVideo: false });
  const user = JSON.parse(localStorage.getItem("user"));

  const api = axios.create();
  api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const fetchBlogs = async () => {
    try {
      const res = await api.get(`${API_BASE}"/api/viewallblogs`);
      setPosts(res.data.Users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`${API_BASE}/deleteblog/${id}`);
      setPosts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete blog");
    }
  };

  const openLightbox = (src, isVideo) => setLightbox({ open: true, src, isVideo });
  const closeLightbox = () => setLightbox({ open: false, src: "", isVideo: false });

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!posts.length) return <div className="text-center mt-5">No blogs available</div>;

  return (
    <div className="background">
      <div className="cards-container">
        {posts.map(post => (
          <div className="pic1" key={post._id}>
            {post.image?.match(/\.(mp4|mov|avi|mkv)$/i) ? (
              <video src={`https://personal-blog-web-backend.onrender.com/api/upload/${post.image}`} className="card-img-top" controls />
            ) : (
              <img
                src={post.image ? `https://personal-blog-web-backend.onrender.com/api/upload/${post.image}` : "https://via.placeholder.com/300"}
                className="card-img-top"
                alt={post.title}
                onClick={() => openLightbox(`https://personal-blog-web-backend.onrender.com/api/upload/${post.image}`, false)}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.description}</p>
              {user?.role === "admin" && (
                <button className="btn btn-warning btn-sm" onClick={() => deleteBlog(post._id)}>🗑 Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {lightbox.open && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          {lightbox.isVideo ? (
            <video className="lightbox-media" src={lightbox.src} controls autoPlay />
          ) : (
            <img className="lightbox-media" src={lightbox.src} alt="Enlarged" />
          )}
        </div>
      )}
    </div>
  );
}

export default BlogCards;
