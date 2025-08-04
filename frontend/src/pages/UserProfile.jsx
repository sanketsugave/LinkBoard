import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

function UserProfile() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/user/${id}`, { withCredentials: true })
      .then(res => {
        setUserInfo(res.data.user);
        setUserPosts(res.data.posts);
      })
      .catch(err => console.error("Failed to load user:", err));
  }, [id]);

  if (!userInfo) return <p className="text-center">Loading user...</p>;

  return (
    <Layout>
    <div className="container mt-5">
      <h3 className="mb-3 text-center">{userInfo.name}'s Profile</h3>
      <p className="text-muted text-center">{userInfo.bio}</p>

      <hr />

      <h5 className="mt-4">Posts by {userInfo.name}</h5>
      {userPosts.length === 0 ? (
        <p className="text-muted">No posts by this user.</p>
      ) : (
        userPosts.map(post => (
          <div
            key={post._id}
            className="card p-3 mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => window.location.href = `/post/${post._id}`}
          >
            <h6>{post.title || "Untitled"}</h6>
            <p className="text-muted small">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
    </Layout>
  );
}

export default UserProfile;
