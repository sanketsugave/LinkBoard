import React, { useState ,useEffect} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import NavBar from './Navbar';  

function Layout({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/current-user', { withCredentials: true })
      .then((res) => {
        setCurrentUser(res.data.user); // either user or null
      })
      .catch((err) => {
        console.error("Error fetching current user:", err);
      });
  }, []);

  const handleLogout = async () => {
    await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
    setCurrentUser(null);
    window.location.href = "/login"; // or use useNavigate
  };
  return (
    <>
      
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-grow-1 container py-4">
        {children}
      </main>
      <Footer />
    </div>
    </>
  );
}

export default Layout;
