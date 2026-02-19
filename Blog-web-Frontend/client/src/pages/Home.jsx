import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const load = async (p = page, s = search) => {
    try {
      setLoading(true);
      const res = await API.get(
        `/posts?page=${p}&limit=${limit}&search=${encodeURIComponent(s)}`
      );

      // ✅ Case 1: backend returns { posts, totalPages, ... }
      if (Array.isArray(res.data?.posts)) {
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages || 1);
        return;
      }

      // ✅ Case 2: backend returns an array directly
      if (Array.isArray(res.data)) {
        setPosts(res.data);
        setTotalPages(1);
        return;
      }

      // fallback
      setPosts([]);
      setTotalPages(1);
    } catch (err) {
      console.error(err);
      setPosts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1, "");
    // eslint-disable-next-line
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1);
    load(1, search);
  };

  const changePage = (nextPage) => {
    setPage(nextPage);
    load(nextPage, search);
  };

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`);
      load(page, search);
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h3 className="mb-0">Latest Posts</h3>

        <form className="d-flex gap-2" onSubmit={onSearch}>
          <input
            className="form-control"
            placeholder="Search title / content / tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ minWidth: 260 }}
          />
          <button className="btn btn-dark" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {loading && (
        <div className="alert alert-info py-2">Loading posts...</div>
      )}

      <div className="row g-3">
        {(posts || []).map((p) => (
          <div className="col-md-4" key={p._id}>
            <div className="card h-100">
              {p.image && (
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  className="card-img-top"
                  alt="cover"
                  style={{ height: 200, objectFit: "cover" }}
                />
              )}

              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="text-muted small mb-2">By {p.author?.name}</p>

                <Link
                  className="btn btn-outline-dark btn-sm"
                  to={`/post/${p._id}`}
                >
                  Read
                </Link>

                {user && (user.role === "admin" || user.id === p.author?._id) && (
                  <>
                    <Link
                      className="btn btn-warning btn-sm ms-2"
                      to={`/edit/${p._id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => deletePost(p._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {!loading && (posts || []).length === 0 && (
          <div className="text-center text-muted mt-4">No posts found</div>
        )}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
        <button
          className="btn btn-outline-dark"
          disabled={page <= 1 || loading}
          onClick={() => changePage(page - 1)}
        >
          Prev
        </button>

        <span className="fw-semibold">
          Page {page} / {totalPages}
        </span>

        <button
          className="btn btn-outline-dark"
          disabled={page >= totalPages || loading}
          onClick={() => changePage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
