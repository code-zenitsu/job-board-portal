import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Job Listings</h2>
      {jobs.map(job => (
        <div key={job._id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p>Experience Level: {job.experienceLevel}</p>
          <p>End Date: {new Date(job.endDate).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default JobList;
