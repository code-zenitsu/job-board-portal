import React, { useState } from 'react';
import axios from 'axios';

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experienceLevel: '',
    candidates: '',
    endDate: ''
  });

  const { title, description, experienceLevel, candidates, endDate } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };

      const body = JSON.stringify({
        ...formData,
        candidates: candidates.split(',').map(email => ({ email: email.trim() }))
      });

      const res = await axios.post('http://localhost:5000/api/jobs', body, config);
      console.log(res.data);
      // Handle successful job posting (e.g., show success message, clear form)
    } catch (err) {
      console.error(err.response.data);
      // Handle job posting error
    }
  };

  return (
    <div>
      <h2>Post a New Job</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Job Title" name="title" value={title} onChange={onChange} required />
        <textarea placeholder="Job Description" name="description" value={description} onChange={onChange} required />
        <input type="text" placeholder="Experience Level" name="experienceLevel" value={experienceLevel} onChange={onChange} required />
        <input type="text" placeholder="Candidate Emails (comma-separated)" name="candidates" value={candidates} onChange={onChange} required />
        <input type="date" placeholder="End Date" name="endDate" value={endDate} onChange={onChange} required />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobForm;
