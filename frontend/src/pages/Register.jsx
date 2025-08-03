import React, { useState,useContext } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Assuming you have a UserContext set up


function Register() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const [form, setForm] = useState({
    name: '',
    bio:'',
    dob: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Loading...');

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      setMessage(data.message);

      navigate("/login");
    } catch (err) {
      setMessage('Error registering');
    }
  };

  return (
     <Layout>

      <div className="container my-5 d-flex justify-content-center align-items-center">
  <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
    <h3 className="text-center mb-4">
      <i className="bi bi-person-plus-fill me-2"></i> Create Your Account
    </h3>

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">👤 Username</label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Enter your name"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">📝 Bio</label>
        <input
          type="text"
          name="bio"
          className="form-control"
          placeholder="Tell us something about you"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">🎂 Date of Birth</label>
        <input
          type="date"
          name="dob"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">📧 Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="example@domain.com"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">🔒 Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Create a strong password"
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-grid">
        <button className="btn btn-success" type="submit">
          <i className="bi bi-check-circle me-1"></i> Register
        </button>
      </div>
    </form>

    {message && (
      <div className="mt-3 alert alert-info text-center py-2">
        {message}
      </div>
    )}
  </div>
</div>

    </Layout>
  );
}

export default Register;
