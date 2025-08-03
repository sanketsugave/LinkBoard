import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { UserContext } from "../context/UserContext";

const EditPost = () => {
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  // Fetch old post data
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/post/${id}`, { withCredentials: true })
      .then((res) => {
        setFormData({
          title: res.data.title || "",
          content: res.data.content || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        alert("❌ Couldn't load post");
        navigate("/posts");
      });
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3000/api/post/${id}`,
        { ...formData },
        { withCredentials: true }
      );
      alert("✅ Post updated!");
      navigate(`/post/${id}`);
    } catch (err) {
      console.error("Update failed:", err);
      alert("❌ Failed to update post");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading post...</div>;

  return (
    <Layout>
      <div className="container mt-5">
        <h4>Edit Post</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Title</label>
            <input
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
            />
          </div>
          <div className="mb-3">
            <label>Content</label>
            <textarea
              className="form-control"
              name="content"
              rows={6}
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your content..."
            ></textarea>
          </div>
          <button className="btn btn-primary" type="submit">
            Update Post
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditPost;
