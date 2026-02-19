import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  const toggleBlock = async (id) => {
    await API.patch(`/admin/users/${id}/block`);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Admin: Users</h3>

      <div className="card p-3">
        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th style={{ width: 140 }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.isBlocked ? "Blocked" : "Active"}</td>
                  <td>
                    {u.role !== "admin" ? (
                      <button
                        className={`btn btn-sm ${u.isBlocked ? "btn-success" : "btn-danger"}`}
                        onClick={() => toggleBlock(u._id)}
                      >
                        {u.isBlocked ? "Unblock" : "Block"}
                      </button>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-muted small mt-2 mb-0">Admins cannot be blocked here.</p>
      </div>
    </div>
  );
}
