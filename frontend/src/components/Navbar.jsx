import { Link } from "react-router-dom";
import React, { useState ,useEffect, useContext} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { UserContext } from "../context/UserContext";
import axios from 'axios';

const NavBar = () => {
    
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
<Navbar bg="dark" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand as={Link} to="/">LinkBoard</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">

      {/* LEFT SIDE LINKS */}
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/" className="active">Home</Nav.Link>
        {currentUser && (
          <Nav.Link as={Link} to="/Posts">Posts</Nav.Link> // optional
        )}
        {currentUser && (
          <Nav.Link as={Link} to="/write">Write Post</Nav.Link> // optional
        )}
        {currentUser && (
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link> // optional
        )}
      </Nav>

      {/* RIGHT SIDE LINKS */}
      <Nav className="ms-auto">
        {!currentUser ? (
          <>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link disabled>Hi, {currentUser.name}</Nav.Link>
            <Nav.Link as="button" onClick={handleLogout}>Logout</Nav.Link>
          </>
        )}
      </Nav>

    </Navbar.Collapse>
  </Container>
</Navbar>

);
};

export default NavBar;