import React from "react";
import Layout from "../components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mt-5">
  <div className="card shadow p-4">
    <h2 className="text-center mb-4">
      <i className="bi bi-info-circle-fill me-2 text-primary"></i>About LinkBoard
    </h2>

    <p className="fs-5">
      <strong>LinkBoard</strong> is a clean and simple social platform where you can freely share your thoughts with the world, discover posts from others, and express yourself in a distraction-free environment.
    </p>

    <p>
      Whether you're a casual writer, a student learning web development, or just someone with something to say—LinkBoard gives you the space to write, connect, and grow.
    </p>

    <hr />

    <p className="text-muted">
      🚀 Built with ❤️ by <strong>Sanket</strong> as a full-stack learning project using React, Node.js, MongoDB, and Bootstrap.
    </p>
  </div>
</div>

    </Layout>
  );
};

export default About;
