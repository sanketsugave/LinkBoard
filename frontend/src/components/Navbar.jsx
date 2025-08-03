import { Link } from "react-router-dom";
import React, { useState ,useEffect, useContext} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { UserContext } from "../context/UserContext";
import axios from 'axios';

const NavBar = () => {
    
      const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/current-user`, { withCredentials: true })
      .then((res) => {
        setCurrentUser(res.data.user); // either user or null
      })
      .catch((err) => {
        console.error("Error fetching current user:", err);
      });
  }, []);

  const handleLogout = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {}, { withCredentials: true });
    setCurrentUser(null);
    window.location.href = "/login"; // or use useNavigate
  };
  return (

<Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
  <Container>
    {/* Logo / Brand */}
    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold">
      <i className="bi bi-link-45deg me-2 fs-4"></i>LinkBoard
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="navbar-nav" />
    <Navbar.Collapse id="navbar-nav">

      {/* LEFT NAV */}
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/" className="px-3">Home</Nav.Link>
        {currentUser && (
          <>
            <Nav.Link as={Link} to="/write" className="px-3">Write</Nav.Link>
            <Nav.Link as={Link} to="/posts" className="px-3">My Posts</Nav.Link>
            <Nav.Link as={Link} to="/profile" className="px-3">Profile</Nav.Link>
          </>
        )}
      </Nav>

      {/* RIGHT NAV */}
      <Nav className="ms-auto align-items-center">
        {!currentUser ? (
          <>
            <Nav.Link as={Link} to="/login" className="px-3">Login</Nav.Link>
            <Nav.Link as={Link} to="/register" className="px-3">Register</Nav.Link>
          </>
        ) : (
          <>
            <span className="navbar-text text-light me-3">👋 {currentUser.name}</span>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline-light"
            >
              Logout
            </button>
          </>
        )}
      </Nav>

    </Navbar.Collapse>
  </Container>
</Navbar>


);
};

export default NavBar;