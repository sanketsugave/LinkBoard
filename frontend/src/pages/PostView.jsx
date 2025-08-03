// // src/pages/PostView.jsx or wherever you're storing components/pages

// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; // if using react-router
// import { UserContext } from "../context/UserContext"; // adjust path as needed
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const PostView = () => {
//   const { id } = useParams(); // assuming route: /post/:id
//   const { currentUser } = useContext(UserContext);
//   const [post, setPost] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`/api/post/${id}`);
//         setPost(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchPost();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`/api/post/${id}`, {
//         headers: {
//           Authorization: `Bearer ${currentUser?.token}`,
//         },
//       });
//       navigate("/posts");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (!post) return <div>Loading post...</div>;

//   return (
//     <div className="post-view">
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//       <p>
//         <small>Author: {post.authorName}</small>
//       </p>

//       {currentUser?.id === post.authorId && (
//         <div style={{ marginTop: "20px" }}>
//           <button onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>
//           <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostView;


import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Layout from "../components/Layout";

const PostView = () => {
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/post/${id}`, {
          withCredentials: true,
        });
        setPost(res.data);
      } catch (err) {
        console.error("Failed to load post:", err.response?.data || err.message);
      }
    };
    fetchPost();
  }, [id]);

  // ✅ DELETE handler
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/post/${id}`, {
        withCredentials: true,
      });

      alert("✅ Post deleted");
      navigate("/posts");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("❌ Failed to delete");
    }
  };

  // 🕐 Loading state
  if (!post) return <div className="text-center mt-5">Loading post...</div>;

  return (
    <Layout>
      <div className="container mt-5">
        <div className="card shadow-sm p-4">
          <h4 className="mb-3">{post.title || "Untitled Post"}</h4>
          <p className="fs-5">{post.content}</p>

          <p className="text-muted mt-3 mb-1">
            <i className="bi bi-person-circle me-2"></i>
            Author: <strong>{post.author?.name || "Unknown"}</strong>
          </p>
          <p className="text-muted">
            <i className="bi bi-clock me-2"></i>
            Created:{" "}
            {new Date(post.createdAt).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          {/* ✅ Show Edit/Delete buttons only if the post belongs to current user */}
          {String(currentUser?._id) === String(post.author?._id) && (
            <div className="mt-4 d-flex gap-3">
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate(`/edit/${post._id}`)}
              >
                <i className="bi bi-pencil-square me-1"></i>✏️  
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={handleDelete}
              >
                <i className="bi bi-trash me-1"></i>🗑️ 
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PostView;
