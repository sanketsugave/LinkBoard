import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Layout from "../components/Layout";

const PostView = () => {
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/${id}`, {
          withCredentials: true,
        });
        setPost(res.data);
      } catch (err) {
        console.error("Failed to load post:", err.response?.data || err.message);
      }
    };
    fetchPost();
  }, [id]);

  // ✅ DELETE handler
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/post/${id}`, {
        withCredentials: true,
      });

      alert("✅ Post deleted");
      navigate("/posts");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("❌ Failed to delete");
    }
  };

  // 🕐 Loading state
  if (!post) return <div className="text-center mt-5">Loading post...</div>;

  return (
    <Layout>

      <div className="container my-5 d-flex justify-content-center">
  <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "720px" }}>
    <div className="mb-3">
      <h2 className="mb-1">{post.title || "Untitled Post"}</h2>
      <hr />
      <p className="fs-5 text-secondary">{post.content}</p>
    </div>

    <div className="mt-4">
      <p className="mb-1 text-muted">
    <i className="bi bi-person-circle me-2"></i>
    <strong
      className="text-primary"
      style={{ cursor: "pointer", textDecoration: "underline" }}
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/user/${post.author._id}`);
      }}
    >
      {post.author?.name || "Unknown"}
    </strong>
  </p>
      <p className="text-muted">
        <i className="bi bi-clock me-2"></i>
        {new Date(post.createdAt).toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>

    {String(currentUser?._id) === String(post.author?._id) && (
      <div className="mt-4 d-flex gap-2 justify-content-end">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => navigate(`/edit/${post._id}`)}
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={handleDelete}
        >
          🗑️ Delete
        </button>
      </div>
    )}
  </div>
</div>

    </Layout>
  );
};

export default PostView;
