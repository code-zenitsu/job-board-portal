const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Company = require('../models/companyModel');
const nodemailer = require('nodemailer');

// @desc    Register new company
// @route   POST /api/companies
// @access  Public
const registerCompany = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if company exists
  const companyExists = await Company.findOne({ email });

  if (companyExists) {
    res.status(400);
    throw new Error('Company already exists');
  }

  // Create company
  const company = await Company.create({
    name,
    email,
    password,
    mobile
  });

  if (company) {
    // Send verification email
    const verificationToken = generateToken(company._id);
    sendVerificationEmail(company.email, verificationToken);

    res.status(201).json({
      _id: company.id,
      name: company.name,
      email: company.email,
      token: generateToken(company._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid company data');
  }
});

// @desc    Authenticate a company
// @route   POST /api/companies/login
// @access  Public
const loginCompany = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for company email
  const company = await Company.findOne({ email });

  if (company && (await company.matchPassword(password))) {
    res.json({
      _id: company.id,
      name: company.name,
      email: company.email,
      token: generateToken(company._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc    Verify company email
// @route   GET /api/companies/verify/:token
// @access  Public
const verifyCompany = asyncHandler(async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findById(decoded.id);

    if (company) {
      company.isVerified = true;
      await company.save();
      res.json({ message: 'Email verified successfully' });
    } else {
      res.status(404);
      throw new Error('Company not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid or expired token');
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Send verification email
const sendVerificationEmail = async (email, token) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: '"Job Board" <noreply@jobboard.com>',
    to: email,
    subject: "Verify your email",
    html: `<p>Please click <a href="${process.env.BASE_URL}/api/companies/verify/${token}">here</a> to verify your email.</p>`,
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = {
  registerCompany,
  loginCompany,
  verifyCompany,
};
