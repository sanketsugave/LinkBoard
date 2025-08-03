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
  <div className="row justify-content-center">
    <div className="col-md-8">

      <div className="card shadow-lg rounded-4 p-4 bg-light">
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-pencil-square fs-3 me-2 text-primary"></i>
          <h4 className="mb-0">Edit Your Post</h4>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">
              📝 Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label fw-semibold">
              ✍️ Content
            </label>
            <textarea
              id="content"
              name="content"
              className="form-control"
              rows={6}
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your content..."
              required
            ></textarea>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-success px-4">
              <i className="bi bi-check2-circle me-1"></i>Update Post
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</div>

    </Layout>
  );
};

export default EditPost;
