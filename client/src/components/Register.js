import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: ''
  });

  const { name, email, password, mobile } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/companies', formData);
      console.log(res.data);
      // Handle successful registration (e.g., redirect to login page)
    } catch (err) {
      console.error(err.response.data);
      // Handle registration error
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
        <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
        <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
        <input type="text" placeholder="Mobile" name="mobile" value={mobile} onChange={onChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
