import React, { useState, useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import MyPostList from '../components/MyPostsList';

function Write() {
  const { currentUser } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();

  // 🧠 Fetch posts written by user
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/myposts`, { withCredentials: true })
      .then((res) => setMyPosts(res.data.posts))
      .catch((err) => console.error('Failed to fetch posts:', err));
  }, []);

  // ✅ Submit new post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setMessage("❌ Title and Content can't be empty");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/post`,
        { title, content },
        { withCredentials: true }
      );

      setMessage('✅ Post created!');
      setTitle('');
      setContent('');

      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      console.error(err);
      setMessage('❌ Something went wrong');
    }
  };

  return (
    <Layout>

      <div className="container mt-5 d-flex justify-content-center">
  <div className="card shadow p-4" style={{ maxWidth: "700px", width: "100%" }}>
    <h3 className="mb-4 text-center">
      <i className="bi bi-pencil-square me-2"></i>Write a New Post
    </h3>

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">📌 Title</label>
        <input
          className="form-control"
          type="text"
          placeholder="Enter a catchy title..."
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">📝 Content</label>
        <textarea
          className="form-control"
          rows="6"
          placeholder="What's on your mind?"
          value={content}
          name="content"
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-success">
          <i className="bi bi-send me-1"></i> Post
        </button>
      </div>
    </form>

    {message && (
      <div className="mt-3 alert alert-info text-center py-2">
        {message}
      </div>
    )}
  </div>
</div>

<hr className="my-5" />

<MyPostList />

    </Layout>
  );
}

export default Write;
