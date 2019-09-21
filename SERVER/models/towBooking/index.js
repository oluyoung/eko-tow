const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const towBookingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  driverId: ObjectId,
  pickupLocation: {
    name: String,
    address: String,
    latitude: {
      type: String,
      required: true
    },
    latitude: {
      type: String,
      required: true
    }
  },
  dropoffLocation: {
    name: String,
    address: String,
    latitude: {
      type: String,
      required: true
    },
    latitude: {
      type: String,
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
