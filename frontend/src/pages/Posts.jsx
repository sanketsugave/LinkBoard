// import React, { useState, useContext,useEffect } from 'react';
// import Layout from '../components/Layout';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { UserContext } from '../context/UserContext';

// function Write() {
//   const { currentUser } = useContext(UserContext);
//   const [myPosts, setMyPosts] = useState([]);
//   const navigate = useNavigate();

//    // 🧠 Fetch posts written by user
//   useEffect(() => {
//     axios.get('http://localhost:3000/api/myposts', { withCredentials: true })
//       .then((res) => setMyPosts(res.data.posts))
//       .catch((err) => console.error("Failed to fetch posts:", err));
//   }, []);

//   return (
//     <Layout>

//         <div className="container mt-5">
//             <h4>Your Posts</h4>
//             {myPosts.length === 0 ? (
//              <p>No posts yet.</p>
//         ) : (
//           myPosts.map(post => (
//             <div key={post._id} className="card my-2 p-3">
//               <p>{post.content}</p>
//               <small className="text-muted">
//                 {new Date(post.createdAt).toLocaleString()}
//               </small>
//             </div>
//           ))
//         )}
//         </div>
//     </Layout>
//   );
// }

// export default Write;


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
    axios.get('http://localhost:3000/api/myposts', { withCredentials: true })
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
