import React from "react";
import Layout from "../components/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="container mt-5">
  <div className="card shadow p-4">
    <h2 className="text-center mb-4">
      <i className="bi bi-envelope-fill me-2 text-primary"></i>Contact Us
    </h2>

    <p className="fs-5 text-center">
      We'd love to hear from you! Whether it's feedback, suggestions, or just a hello 👋 — we're all ears.
    </p>

    <div className="mt-4 text-center">
      <p className="mb-2">
        📧 Email us at:{" "}
        <strong>
          <a href="mailto:support@linkboard.com" className="text-decoration-none">
            support@linkboard.com
          </a>
        </strong>
      </p>

      <p>
        🌐 Visit our GitHub:{" "}
        <a
          href="https://github.com/sanketsugave/LinkBoard" // Update this to your real GitHub
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none"
        >
          github.com/linkboard
        </a>
      </p>
    </div>

    <hr />

    <p className="text-muted text-center">
      We usually reply within 24–48 hours. Thanks for being part of the LinkBoard community!
    </p>
  </div>
</div>

    </Layout>
  );
};

export default Contact;
