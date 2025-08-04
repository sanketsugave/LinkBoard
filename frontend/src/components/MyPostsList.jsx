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
      .get(`${import.meta.env.VITE_API_URL}/api/myposts`, { withCredentials: true })
      .then((res) => setMyPosts(res.data.posts))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  const handleDelete = async (e, postId) => {
  e.stopPropagation();
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/post/${postId}`, {
      withCredentials: true,
    });
    // Remove post from state
    setMyPosts((prev) => prev.filter((post) => post._id !== postId));
  } catch (err) {
    console.error("Delete failed:", err);
  }
};


  return (
  <div className="mt-5">
      <h4 className="mb-4 text-center">
        <i className="bi bi-journal-text me-2"></i>Your Posts
      </h4>

      {myPosts.length === 0 ? (
        <p className="text-center text-muted">No posts yet.</p>
      ) : (
        myPosts.map((post) => (
          <div
            key={post._id}
            className="card shadow-sm p-4 mb-4 border-0 rounded-3 mx-auto"
            style={{
              maxWidth: "650px",
              cursor: "pointer",
              background: "#fdfdfd",
            }}
            onClick={() => navigate(`/post/${post._id}`)}
          >
            <h5 className="fw-bold">{post.title || "Untitled Post"}</h5>
            <p className="text-secondary mb-2">{post.content}</p>

            <small className="text-muted d-block mb-2">
  👤 <span
        className="text-primary"
        style={{ cursor: "pointer", textDecoration: "underline" }}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/user/${post.author._id}`);
        }}
      >
        {post.author?.name || "Unknown"}
      </span> • 🕒{" "}
  {new Date(post.createdAt).toLocaleString()}
</small>


            {currentUser?._id === post.author?._id && (
              <div className="mt-3 d-flex justify-content-end gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit/${post._id}`);
                  }}
                >
                  <i className="bi bi-pencil me-1"></i> Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={(e) => handleDelete(e, post._id)}
                >
                  <i className="bi bi-trash me-1"></i> Delete
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
