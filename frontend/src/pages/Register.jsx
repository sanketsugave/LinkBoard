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
      <div className='container my-5 d-flex justify-content-center'>
        <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Bio</label>
          <input type="text" name="bio" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Date of Birth</label>
          <input type="date" name="dob" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
      <p className="mt-3">{message}</p>
      </div>
      </div>
    </Layout>
  );
}

export default Register;
