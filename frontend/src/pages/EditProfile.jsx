// src/pages/EditProfile.jsx
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [dob, setDob] = useState(currentUser?.dob ? currentUser.dob.slice(0, 10) : "");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/profile`,
        { name, bio, dob },
        { withCredentials: true }
      );

      setMessage("✅ Profile updated successfully");
      setCurrentUser(res.data.user); // update local context
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("❌ Failed to update profile");
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-8">
      <div className="card p-4 shadow-lg rounded-4 bg-light">

        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-gear-fill fs-4 me-2 text-primary"></i>
          <h4 className="mb-0">Edit Profile</h4>
        </div>

        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label fw-semibold">👤 Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">🧾 Bio</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write a short bio about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">🎂 Date of Birth</label>
            <input
              type="date"
              className="form-control"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success px-4">
              <i className="bi bi-save2 me-1"></i>Save Changes
            </button>
          </div>
        </form>

        {message && (
          <div className="alert alert-info mt-3">
            {message}
          </div>
        )}
      </div>
    </div>
  </div>
</div>

    </Layout>
  );
};

export default EditProfile;
