const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createJob);
router.get('/', protect, getJobs);

module.exports = router;
