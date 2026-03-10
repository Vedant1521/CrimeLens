const mongoose = require('mongoose');

const crimeSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    index: true
  },
  stateCode: String,
  year: {
    type: Number,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  count: {
    type: Number,
    default: 0
  },
  population: Number,
  crimeRate: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate crime rate before saving
crimeSchema.pre('save', function(next) {
  if (this.population && this.count) {
    this.crimeRate = (this.count / this.population * 100000).toFixed(2);
  }
  next();
});

module.exports = mongoose.model('Crime', crimeSchema);