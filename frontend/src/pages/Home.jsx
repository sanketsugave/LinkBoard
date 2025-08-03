// import React from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import Layout from '../components/Layout';

// function Home() {
//   return (
//     <Layout>
//       <div className="text-center">
//         <h1>Welcome to LinkBoard</h1>
//         <p>Your professional network platform.</p>
//       </div>
//     </Layout>
//   );
// }

// export default Home;


import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts", { withCredentials: true })
      .then((res) => setPosts(res.data.posts))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <Layout>
  <div className="container mt-5 d-flex justify-content-center">
    <div className="col-md-8 col-lg-6">
      <h3 className="mb-4 text-center">🌍 Public Posts</h3>

      {posts.length === 0 ? (
        <p className="text-center">No posts available yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="card p-3 mb-3 shadow-sm"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/post/${post._id}`)}
          >
            <h5>{post.title || "Untitled Post"}</h5>
            <p>{post.content}</p>
            <small className="text-muted">
              Posted by {post.author?.name || "Unknown"} •{" "}
              {new Date(post.createdAt).toLocaleString()}
            </small>

            {currentUser?._id === post.author?._id && (
              <div className="mt-2 d-flex gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit/${post._id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    axios
                      .delete(`http://localhost:3000/api/post/${post._id}`, {
                        withCredentials: true,
                      })
                      .then(() =>
                        setPosts(posts.filter((p) => p._id !== post._id))
                      )
                      .catch((err) => console.error("Delete error:", err));
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}

      {!currentUser && posts.length === 5 && (
        <div className="alert alert-info mt-4 text-center">
          🔒 Sign up to see more posts!
          <button
            className="btn btn-sm btn-primary ms-2"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      )}
    </div>
  </div>
</Layout>

  );
};

export default Home;
