import React, { useState, useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import MyPostList from '../components/MyPostsList';

function Posts() {
  const { currentUser } = useContext(UserContext);
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();

  // 🧠 Fetch posts written by user
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/myposts`, { withCredentials: true })
      .then((res) => setMyPosts(res.data.posts))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  return (
    <Layout>
      <div className="container mt-5">
        <MyPostList />
      </div>
    </Layout>
  );
}

export default Posts;
