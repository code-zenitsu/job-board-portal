const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
  mobile: {
    type: String,
    required: [true, 'Please add a mobile number']
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

companySchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

companySchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Company', companySchema);
