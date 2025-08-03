import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  console.log("API:", import.meta.env.VITE_API_URL);


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/posts`, { withCredentials: true })
      .then((res) => setPosts(res.data.posts))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <Layout>
  <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-8 col-lg-6">

      <div className="text-center mb-4">
        <h3 className="fw-bold">
          🌍 Explore Public Posts
        </h3>
        <p className="text-muted mb-0">See what others are sharing across the platform</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted">No posts available yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="card p-3 mb-4 shadow-sm border-0"
            style={{ cursor: "pointer", transition: "0.2s ease-in-out" }}
            onClick={() => navigate(`/post/${post._id}`)}
          >
            <h5 className="mb-2 fw-semibold">{post.title || "Untitled Post"}</h5>
            <p className="mb-2">{post.content}</p>

            <small className="text-muted">
              👤 {post.author?.name || "Unknown"} • 🕒{" "}
              {new Date(post.createdAt).toLocaleString()}
            </small>

            {currentUser?._id === post.author?._id && (
              <div className="mt-3 d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit/${post._id}`);
                  }}
                >
                  🖊️ Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    axios
                      .delete(`${import.meta.env.VITE_API_URL}/api/post/${post._id}`, {
                        withCredentials: true,
                      })
                      .then(() =>
                        setPosts(posts.filter((p) => p._id !== post._id))
                      )
                      .catch((err) => console.error("Delete error:", err));
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}

      {!currentUser && posts.length === 5 && (
        <div className="alert alert-warning mt-4 text-center">
          🔒 You're seeing limited posts.{" "}
          <button
            className="btn btn-sm btn-warning ms-2"
            onClick={() => navigate("/register")}
          >
            Register to see more →
          </button>
        </div>
      )}

    </div>
  </div>
</div>

</Layout>

  );
};

export default Home;
