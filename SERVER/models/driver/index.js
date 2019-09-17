const mongoose = require('mongoose');

const { hashPassword } = require('../utils');
const instanceMethods = require('../instance-methods');

const driverSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
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
      type: String, // flatbed / drag
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

driverSchema.method({
  ...instanceMethods
});

driverSchema.pre('save', async function() {
  if ( this.password && this.isModified('password') ) {
    this.password = await hashPassword(this.password);
  }
});

//Virtuals
driverSchema.virtual('full_name').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

driverSchema.virtual('name').get(function () {
  return this.firstName;
});

module.exports = mongoose.model('Driver', driverSchema);
