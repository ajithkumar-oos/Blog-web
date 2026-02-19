import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;
  const [totalPages, setTotalPages] = useState(1);

  const load = async (p = page, s = search) => {
    const res = await API.get(`/admin/posts?page=${p}&limit=${limit}&search=${encodeURIComponent(s)}`);
    setPosts(res.data.posts);
    setTotalPages(res.data.totalPages || 1);
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

  const deleteAny = async (id) => {
    if (!window.confirm("Admin: delete this post?")) return;
    try {
      await API.delete(`/admin/posts/${id}`);
      load(page, search);
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h3 className="mb-0">Admin: Manage Posts</h3>

        <form className="d-flex gap-2" onSubmit={onSearch}>
          <input
            className="form-control"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ minWidth: 260 }}
          />
          <button className="btn btn-dark">Search</button>
        </form>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th style={{ width: 90 }}>Image</th>
              <th>Title</th>
              <th style={{ width: 170 }}>Author</th>
              <th style={{ width: 170 }}>Created</th>
              <th style={{ width: 200 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((p) => (
              <tr key={p._id}>
                <td>
                  {p.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${p.image}`}
                      alt="cover"
                      style={{ width: 70, height: 50, objectFit: "cover" }}
                      className="rounded"
                    />
                  ) : (
                    <span className="text-muted">No image</span>
                  )}
                </td>

                <td>
                  <div className="fw-semibold">{p.title}</div>
                  <Link to={`/post/${p._id}`} className="small">View</Link>
                </td>

                <td>{p.author?.name}</td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>

                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteAny(p._id)}>
                    Delete
                  </button>

                  <Link className="btn btn-warning btn-sm ms-2" to={`/edit/${p._id}`}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}

            {posts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No posts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
        <button className="btn btn-outline-dark" disabled={page <= 1} onClick={() => changePage(page - 1)}>
          Prev
        </button>

        <span className="fw-semibold">
          Page {page} / {totalPages}
        </span>

        <button className="btn btn-outline-dark" disabled={page >= totalPages} onClick={() => changePage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
