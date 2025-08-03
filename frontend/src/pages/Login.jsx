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
      const res = await fetch('http://localhost:3000/api/login', {
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
      <div className='container my-5 d-flex justify-content-center'>
        <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button className="btn btn-success" type="submit">Login</button>
      </form>
      <p className="mt-3">{message}</p>
      </div>
      </div>
    </Layout>
  );
}

export default Login;
