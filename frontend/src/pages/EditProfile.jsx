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
        "http://localhost:3000/api/profile",
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
        <div className="card p-4 shadow-sm">
          <h4>Edit Profile</h4>

          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Bio</label>
              <textarea
                className="form-control"
                rows="3"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>

          {message && <p className="mt-3">{message}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
