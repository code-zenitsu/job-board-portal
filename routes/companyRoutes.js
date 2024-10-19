const express = require('express');
const router = express.Router();
const {
  registerCompany,
  loginCompany,
  verifyCompany,
} = require('../controllers/companyController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerCompany);
router.post('/login', loginCompany);
router.get('/verify/:token', verifyCompany);

module.exports = router;
