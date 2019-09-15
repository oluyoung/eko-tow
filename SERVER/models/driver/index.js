const mongoose = require('mongoose');
const Driver = require('../driver');
const ObjectId = mongoose.Schema.Types.ObjectId;

const driversLocationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  license: {
    number: {
      type: String,
      required: true
    },
    issueDate: {
      type: Date,
      required: true
    },
    expiryDate: {
      type: Date,
      required: true
    }
  },
  profilePhoto: {},
  rating: {
    type: Number,
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    }
  },
  trucks: [{
    model: {
      type: String,
      required: true
    },
    plateNumber: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    isPrimary: Boolean
  }],
  accountDetails: {
    accountName: String,
    number: Number,
    bank: String
  }
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

module.exports = mongoose.model('DriversLocation', driversLocationSchema);
