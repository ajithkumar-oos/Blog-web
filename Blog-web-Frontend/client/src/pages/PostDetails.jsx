import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
    })();
  }, [id]);

  if (!post) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: 900 }}>
      <h2>{post.title}</h2>
      <p className="text-muted">By {post.author?.name}</p>

      {post.image && (
        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt="cover"
          className="img-fluid rounded mb-3"
        />
      )}

      <div className="card p-3">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
