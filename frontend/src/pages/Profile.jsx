// src/pages/Profile.jsx

import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import MyPostList from "../components/MyPostsList";
import { useNavigate } from "react-router-dom";

const Profile = () => {
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
    <Layout>
      <div className="container mt-5">
        <div className="card shadow-sm p-4">
          <h3 className="mb-3">
            <i className="bi bi-person-circle me-2"></i>Profile
          </h3>

          <p><strong>Name:</strong> {currentUser?.name}</p>
          <p><strong>Email:</strong> {currentUser?.email}</p>
          <p><strong>Bio:</strong> {currentUser?.bio || "No bio provided"}</p>
          <p><strong>Date of Birth: </strong>{currentUser?.dob &&
              new Date(currentUser.dob).toISOString().split('T')[0]}
          </p>
          <p><strong>Total Posts:</strong> {myPosts.length}</p>

          <div className="mt-3">
  <button className="btn btn-outline-secondary" onClick={() => navigate("/edit-profile")}>
    Edit Profile
  </button>
</div>


          <hr />

          <MyPostList />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
