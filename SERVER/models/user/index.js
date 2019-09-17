const mongoose = require('mongoose');

const { hashPassword } = require('../utils');
const instanceMethods = require('../instance-methods');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  profilePhoto: {
    original: String,
    sm: String,
    xs: String
  },
  dob: {
    type: Date,
    required: true
  }
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

userSchema.method({
  ...instanceMethods
});

userSchema.pre('save', async function() {
  if ( this.password && this.isModified('password') ) {
    this.password = await hashPassword(this.password);
  }
});

//Virtuals
userSchema.virtual('full_name').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual('name').get(function () {
  return this.firstName;
});

module.exports = mongoose.model('User', userSchema);
