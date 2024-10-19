const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModel');
const Company = require('../models/companyModel');
const nodemailer = require('nodemailer');

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private
const createJob = asyncHandler(async (req, res) => {
  const { title, description, experienceLevel, candidates, endDate } = req.body;

  if (!title || !description || !experienceLevel || !candidates || !endDate) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const company = await Company.findById(req.company.id);

  if (!company.isVerified) {
    res.status(403);
    throw new Error('Company is not verified');
  }

  const job = await Job.create({
    company: req.company.id,
    title,
    description,
    experienceLevel,
    candidates,
    endDate
  });

  if (job) {
    // Send email to candidates
    sendJobAlerts(job, company);

    res.status(201).json(job);
  } else {
    res.status(400);
    throw new Error('Invalid job data');
  }
});

// @desc    Get jobs for a company
// @route   GET /api/jobs
// @access  Private
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ company: req.company.id });
  res.json(jobs);
});

// Send job alerts to candidates
const sendJobAlerts = async (job, company) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  for (let candidate of job.candidates) {
    let info = await transporter.sendMail({
      from: '"Job Board" <noreply@jobboard.com>',
      to: candidate.email,
      subject: `New Job Opportunity: ${job.title}`,
      html: `
        <h1>New Job Opportunity</h1>
        <p>Company: ${company.name}</p>
        <p>Title: ${job.title}</p>
        <p>Description: ${job.description}</p>
        <p>Experience Level: ${job.experienceLevel}</p>
        <p>End Date: ${job.endDate}</p>
      `,
    });

    console.log("Message sent: %s", info.messageId);
  }
};

module.exports = {
  createJob,
  getJobs,
};
