import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <div className="mb-2">
          <Link to="/about" className="text-light me-3 text-decoration-none">About Us</Link>
          <Link to="/contact" className="text-light me-3 text-decoration-none">Contact</Link>
          <Link to="/privacy" className="text-light text-decoration-none">Privacy Policy</Link>
        </div>
        <small>
          &copy; {new Date().getFullYear()} <strong>LinkBoard</strong> | Made with 💙 by Sanket
        </small>
      </div>
    </footer>
  );
};

export default Footer;
