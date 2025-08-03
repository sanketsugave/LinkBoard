import React, { useState,useContext } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Assuming you have a UserContext set up


function Login() {
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Logging in...');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // important for cookies
        body: JSON.stringify(form)
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        // store token later here if needed
        console.log('Login success ✅');
        setCurrentUser(data.user);
      }

      navigate("/");
    } catch (err) {
      setMessage('Something went wrong ❌');
    }
  };

  return (
    <Layout>

      <div className="container my-5 d-flex justify-content-center align-items-center">
  <div className="card shadow-lg p-4" style={{ maxWidth: '420px', width: '100%' }}>
    <div className="text-center mb-4">
      <i className="bi bi-person-circle" style={{ fontSize: "3rem", color: "#0d6efd" }}></i>
      <h3 className="mt-2">Welcome Back</h3>
      <p className="text-muted">Login to continue</p>
    </div>

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">📧 Email address</label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control"
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">🔒 Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-grid mt-4">
        <button type="submit" className="btn btn-primary">Login</button>
      </div>
    </form>

    {message && <p className="text-danger mt-3 text-center">{message}</p>}

    <hr className="my-4" />

    <p className="text-center mb-0">
      Don't have an account?{" "}
      <a href="/register" className="text-decoration-none">Register</a>
    </p>
  </div>
</div>

    </Layout>
  );
}

export default Login;
