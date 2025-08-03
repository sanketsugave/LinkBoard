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
  <div className="row justify-content-center">
    <div className="col-md-8">

      <div className="card shadow-lg rounded-4 p-4 mb-5 bg-light">
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-person-circle fs-2 me-3 text-primary"></i>
          <h3 className="mb-0">User Profile</h3>
        </div>

        <div className="row mb-3">
          <div className="col-sm-4 text-muted">👤 Name:</div>
          <div className="col-sm-8">{currentUser?.name}</div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-4 text-muted">📧 Email:</div>
          <div className="col-sm-8">{currentUser?.email}</div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-4 text-muted">📝 Bio:</div>
          <div className="col-sm-8">{currentUser?.bio || "No bio provided"}</div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-4 text-muted">🎂 Date of Birth:</div>
          <div className="col-sm-8">
            {currentUser?.dob
              ? new Date(currentUser.dob).toISOString().split("T")[0]
              : "Not provided"}
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-sm-4 text-muted">📝 Total Posts:</div>
          <div className="col-sm-8">{myPosts.length}</div>
        </div>

        <div className="text-end">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/edit-profile")}
          >
            <i className="bi bi-pencil-square me-1"></i> Edit Profile
          </button>
        </div>
      </div>

      <MyPostList />
    </div>
  </div>
</div>

    </Layout>
  );
};

export default Profile;
