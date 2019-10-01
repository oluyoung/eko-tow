const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const towBookingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  userId: {
    type: ObjectId,
    required: true
  },
  driverId: ObjectId,
  pickupLocation: {
    name: String,
    address: String,
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  dropoffLocation: {
    name: String,
    address: String,
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  fare: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'PENDING'
  }
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

module.exports = mongoose.model('Tow', towBookingSchema);
