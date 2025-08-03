// src/components/MyPostList.jsx
import React, { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const MyPostList = () => {
  const { currentUser } = useContext(UserContext);
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/myposts", { withCredentials: true })
      .then((res) => setMyPosts(res.data.posts))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  return (
    <div className="mt-5">
      <h4>Your Posts</h4>

      {myPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        myPosts.map((post) => (
          <div
            key={post._id}
            className="card p-3 mb-3 shadow-sm mx-auto"
            style={{ maxWidth: "600px", cursor: "pointer" }}
            onClick={() => navigate(`/post/${post._id}`)}
>
  <h5 className="mb-1">{post.title || "Untitled Post"}</h5>
  <p className="mb-2">{post.content}</p>

  <small className="text-muted">
    👤 {post.author?.name || "Unknown"} • 🕒{" "}
    {new Date(post.createdAt).toLocaleString()}
  </small>

  {currentUser?._id === post.author?._id && (
    <div className="mt-2 d-flex gap-2">
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/edit/${post._id}`);
        }}
      >
        🖊️ Edit
      </button>
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={(e) => {
          e.stopPropagation();
          axios
            .delete(`http://localhost:3000/api/post/${post._id}`, {
              withCredentials: true,
            })
            .then(() => {
              // Optional: remove deleted post from state if you have state like setPosts
              setPosts((prev) => prev.filter((p) => p._id !== post._id));
            })
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
    </div>
  );
};

export default MyPostList;
