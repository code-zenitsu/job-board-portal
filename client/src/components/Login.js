import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/companies/login', formData);
      console.log(res.data);
      // Handle successful login (e.g., save token to localStorage, redirect to dashboard)
    } catch (err) {
      console.error(err.response.data);
      // Handle login error
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
        <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
