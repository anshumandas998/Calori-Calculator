import { useState, useEffect } from "react";

export default function AdminDashboard({ user, COLORS, S, isMobile }) {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalMeals: 0, totalWaterLogs: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  
  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState(null);

  // Add / Edit form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    age: "",
    weight: "",
    height: "",
    goal: "maintain"
  });
  const [formErr, setFormErr] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("nu_token");
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, statsRes] = await Promise.all([
        fetch("/api/admin/users", { headers: getAuthHeader() }),
        fetch("/api/admin/stats", { headers: getAuthHeader() }),
      ]);
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData || []);
      }
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData || { totalUsers: 0, totalMeals: 0, totalWaterLogs: 0 });
      }
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
      age: "",
      weight: "",
      height: "",
      goal: "maintain"
    });
    setFormErr("");
    setAddModalOpen(true);
  };

  const handleOpenEdit = (u) => {
    setEditUser(u);
    setFormData({
      name: u.name || "",
      email: u.email || "",
      password: "",
      role: u.role || "user",
      age: u.age || "",
      weight: u.weight || "",
      height: u.height || "",
      goal: u.goal || "maintain"
    });
    setFormErr("");
  };

  const handleSaveAdd = async (e) => {
    e.preventDefault();
    setFormErr("");
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormErr("Name and email are required.");
      return;
    }
    setFormLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create user");
      setAddModalOpen(false);
      fetchData();
    } catch (err) {
      setFormErr(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editUser) return;
    setFormErr("");
    setFormLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${editUser.id}`, {
        method: "PUT",
        headers: getAuthHeader(),
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update user");
      setEditUser(null);
      fetchData();
    } catch (err) {
      setFormErr(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmUser) return;
    try {
      const res = await fetch(`/api/admin/users/${deleteConfirmUser.id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      if (res.ok) {
        setDeleteConfirmUser(null);
        fetchData();
      }
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(users, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `supabase_users_export_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.name && u.name.toLowerCase().includes(search.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(search.toLowerCase()));
    const matchesRole = roleFilter === "all" || (u.role || "user") === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", animation: "fadeUp 0.3s ease" }}>
      {/* Top Header */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        gap: 16,
        marginBottom: 28,
      }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(35, 122, 68, 0.08)", color: "#237a44", fontWeight: 700, fontSize: 12, padding: "4px 12px", borderRadius: 20, marginBottom: 8, textTransform: "uppercase" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#237a44" }} />
            Supabase Database Management
          </div>
          <h1 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: COLORS.text, margin: 0, letterSpacing: "-0.02em" }}>
            User Data & Admin Control
          </h1>
          <p style={{ color: COLORS.textMuted, fontSize: 14, margin: "4px 0 0" }}>
            Store, view, edit, and manage all users directly synchronized with your live Supabase database.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={fetchData}
            style={{
              ...S.btnOutline,
              padding: "10px 18px",
              fontSize: 13,
              borderRadius: 10,
              gap: 6,
            }}
          >
            <span>🔄</span> Refresh
          </button>

          <button
            onClick={handleExportJSON}
            style={{
              ...S.btnOutline,
              padding: "10px 18px",
              fontSize: 13,
              borderRadius: 10,
              gap: 6,
            }}
          >
            <span>⬇️</span> Export JSON
          </button>

          <button
            onClick={handleOpenAdd}
            style={{
              ...S.btn,
              padding: "10px 22px",
              fontSize: 14,
              borderRadius: 10,
              background: "#237a44",
              boxShadow: "0 4px 14px rgba(35, 122, 68, 0.25)",
            }}
          >
            + Store New User
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: 16,
        marginBottom: 28,
      }}>
        {[
          { label: "Total Registered Users", val: stats.totalUsers || users.length, icon: "👥", color: "#237a44" },
          { label: "Database Engine", val: "Supabase PG", icon: "⚡", color: "#0284c7" },
          { label: "Total Meals Stored", val: stats.totalMeals || 0, icon: "🥗", color: "#e67e22" },
          { label: "Hydration Logs", val: stats.totalWaterLogs || 0, icon: "💧", color: "#0891b2" },
        ].map((s, idx) => (
          <div key={idx} style={{
            background: "#ffffff",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 18,
            padding: "20px 18px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase" }}>
                {s.label}
              </span>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: s.color }}>
              {s.val}
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: "#ffffff",
        border: `1px solid ${COLORS.border}`,
        borderRadius: 18,
        padding: "16px 20px",
        marginBottom: 20,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "stretch" : "center",
        justifyContent: "space-between",
        gap: 14,
        boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
      }}>
        {/* Search Input */}
        <div style={{ position: "relative", flex: 1, maxWidth: isMobile ? "100%" : 380 }}>
          <span style={{ position: "absolute", left: 14, top: 12, color: "#a1a1aa", fontSize: 16 }}>🔍</span>
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              ...S.input,
              paddingLeft: 40,
              borderRadius: 10,
              fontSize: 13,
              background: "#fbf9f6",
            }}
          />
        </div>

        {/* Role Filter Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textMuted }}>Role:</span>
          {["all", "user", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: roleFilter === r ? "1px solid #237a44" : `1px solid ${COLORS.border}`,
                background: roleFilter === r ? "rgba(35, 122, 68, 0.08)" : "#ffffff",
                color: roleFilter === r ? "#237a44" : COLORS.textMuted,
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div style={{
        background: "#ffffff",
        border: `1px solid ${COLORS.border}`,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
      }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#faf8f5", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.textMuted, textTransform: "uppercase", fontSize: 11, letterSpacing: "0.05em" }}>
                <th style={{ padding: "14px 20px" }}>User</th>
                <th style={{ padding: "14px 16px" }}>Role</th>
                <th style={{ padding: "14px 16px" }}>Goal</th>
                <th style={{ padding: "14px 16px" }}>Metrics</th>
                <th style={{ padding: "14px 16px" }}>Stored Date</th>
                <th style={{ padding: "14px 20px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ padding: 40, textAlign: "center", color: COLORS.textMuted }}>
                    Loading Supabase user records...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: 40, textAlign: "center", color: COLORS.textMuted }}>
                    No user records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #f4efe9", transition: "background 0.15s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#faf8f5")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    {/* User Info */}
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          background: (u.role === "admin") ? "linear-gradient(135deg, #e67e22, #d35400)" : "linear-gradient(135deg, #237a44, #1e683a)",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: 14,
                          flexShrink: 0,
                        }}>
                          {u.avatar || u.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 14 }}>{u.name}</div>
                          <div style={{ color: COLORS.textMuted, fontSize: 12 }}>{u.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td style={{ padding: "16px 16px" }}>
                      <span style={{
                        padding: "3px 10px",
                        borderRadius: 14,
                        fontSize: 11,
                        fontWeight: 700,
                        background: u.role === "admin" ? "rgba(230, 126, 34, 0.1)" : "rgba(35, 122, 68, 0.08)",
                        color: u.role === "admin" ? "#e67e22" : "#237a44",
                        textTransform: "uppercase",
                      }}>
                        {u.role || "user"}
                      </span>
                    </td>

                    {/* Goal */}
                    <td style={{ padding: "16px 16px" }}>
                      <span style={{ fontWeight: 600, color: COLORS.text, textTransform: "capitalize" }}>
                        {u.goal || "maintain"}
                      </span>
                    </td>

                    {/* Body Metrics */}
                    <td style={{ padding: "16px 16px", color: COLORS.textMuted }}>
                      {u.age ? `${u.age}y` : "--"} • {u.weight ? `${u.weight}kg` : "--"} • {u.height ? `${u.height}cm` : "--"}
                    </td>

                    {/* Stored Date */}
                    <td style={{ padding: "16px 16px", color: COLORS.textMuted, fontSize: 12 }}>
                      {u.created_at ? new Date(u.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                    </td>

                    {/* Action Buttons */}
                    <td style={{ padding: "16px 20px", textAlign: "right" }}>
                      <button
                        onClick={() => handleOpenEdit(u)}
                        style={{
                          background: "transparent",
                          border: "1px solid #e4e4e7",
                          borderRadius: 8,
                          padding: "6px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                          color: COLORS.text,
                          cursor: "pointer",
                          marginRight: 8,
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#237a44")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e4e4e7")}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirmUser(u)}
                        style={{
                          background: "transparent",
                          border: "1px solid #fee2e2",
                          borderRadius: 8,
                          padding: "6px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#dc2626",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#fee2e2")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Add User Modal ─── */}
      {addModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(24, 24, 27, 0.45)",
          backdropFilter: "blur(10px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: 22,
            padding: 28,
            width: "min(480px, 100%)",
            boxShadow: "0 20px 50px -10px rgba(0,0,0,0.15)",
            border: `1px solid ${COLORS.border}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Outfit', sans-serif", margin: 0, color: COLORS.text }}>
                Store New User in Supabase
              </h3>
              <button
                onClick={() => setAddModalOpen(false)}
                style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: COLORS.textMuted }}
              >
                ✕
              </button>
            </div>

            {formErr && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 16 }}>
                {formErr}
              </div>
            )}

            <form onSubmit={handleSaveAdd} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={S.label}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Connor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={S.input}
                />
              </div>

              <div>
                <label style={S.label}>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={S.input}
                />
              </div>

              <div>
                <label style={S.label}>Password (Default: temp123)</label>
                <input
                  type="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={S.input}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={S.label}>Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{ ...S.input, cursor: "pointer" }}
                  >
                    <option value="user">Standard User</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div>
                  <label style={S.label}>Fitness Goal</label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    style={{ ...S.input, cursor: "pointer" }}
                  >
                    <option value="lose">Weight Loss</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="gain">Build Muscle</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                <div>
                  <label style={S.label}>Age</label>
                  <input
                    type="number"
                    placeholder="28"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    style={S.input}
                  />
                </div>
                <div>
                  <label style={S.label}>Weight (kg)</label>
                  <input
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    style={S.input}
                  />
                </div>
                <div>
                  <label style={S.label}>Height (cm)</label>
                  <input
                    type="number"
                    placeholder="175"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    style={S.input}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 14 }}>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  style={{ ...S.btnOutline, padding: "10px 20px", borderRadius: 10 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  style={{ ...S.btn, padding: "10px 24px", borderRadius: 10, background: "#237a44" }}
                >
                  {formLoading ? "Saving to Supabase..." : "Save User to Supabase"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Edit User Modal ─── */}
      {editUser && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(24, 24, 27, 0.45)",
          backdropFilter: "blur(10px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: 22,
            padding: 28,
            width: "min(480px, 100%)",
            boxShadow: "0 20px 50px -10px rgba(0,0,0,0.15)",
            border: `1px solid ${COLORS.border}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Outfit', sans-serif", margin: 0, color: COLORS.text }}>
                Edit User in Supabase
              </h3>
              <button
                onClick={() => setEditUser(null)}
                style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: COLORS.textMuted }}
              >
                ✕
              </button>
            </div>

            {formErr && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 16 }}>
                {formErr}
              </div>
            )}

            <form onSubmit={handleSaveEdit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={S.label}>Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={S.input}
                />
              </div>

              <div>
                <label style={S.label}>Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={S.input}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={S.label}>Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{ ...S.input, cursor: "pointer" }}
                  >
                    <option value="user">Standard User</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div>
                  <label style={S.label}>Fitness Goal</label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    style={{ ...S.input, cursor: "pointer" }}
                  >
                    <option value="lose">Weight Loss</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="gain">Build Muscle</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                <div>
                  <label style={S.label}>Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    style={S.input}
                  />
                </div>
                <div>
                  <label style={S.label}>Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    style={S.input}
                  />
                </div>
                <div>
                  <label style={S.label}>Height (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    style={S.input}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 14 }}>
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  style={{ ...S.btnOutline, padding: "10px 20px", borderRadius: 10 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  style={{ ...S.btn, padding: "10px 24px", borderRadius: 10, background: "#237a44" }}
                >
                  {formLoading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Delete Confirmation Modal ─── */}
      {deleteConfirmUser && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(24, 24, 27, 0.45)",
          backdropFilter: "blur(10px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: 20,
            padding: 24,
            width: "min(400px, 100%)",
            boxShadow: "0 20px 50px -10px rgba(0,0,0,0.15)",
            border: "1px solid #fee2e2",
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#dc2626", margin: "0 0 8px" }}>
              Delete User from Supabase?
            </h3>
            <p style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.5, margin: "0 0 20px" }}>
              Are you sure you want to permanently delete <strong>{deleteConfirmUser.name}</strong> ({deleteConfirmUser.email})? This action cannot be undone.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                onClick={() => setDeleteConfirmUser(null)}
                style={{ ...S.btnOutline, padding: "8px 16px", borderRadius: 8, fontSize: 13 }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                style={{
                  background: "#dc2626",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Yes, Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
