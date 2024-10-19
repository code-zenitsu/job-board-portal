const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Company'
  },
  title: {
    type: String,
    required: [true, 'Please add a job title']
  },
  description: {
    type: String,
    required: [true, 'Please add a job description']
  },
  experienceLevel: {
    type: String,
    required: [true, 'Please add an experience level']
  },
  candidates: [{
    email: {
      type: String,
      required: [true, 'Please add candidate email']
    }
  }],
  endDate: {
    type: Date,
    required: [true, 'Please add an end date']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);
