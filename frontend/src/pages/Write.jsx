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
      .get('http://localhost:3000/api/myposts', { withCredentials: true })
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
        'http://localhost:3000/api/post',
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
      <div className="container mt-5">
        <h2>📝 Write a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Post title"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              rows="5"
              placeholder="What's on your mind?"
              value={content}
              name="content"
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </form>

        {message && <p className="mt-3">{message}</p>}

        <hr />
        <MyPostList />
      </div>
    </Layout>
  );
}

export default Write;
