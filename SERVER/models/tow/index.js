const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const towSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  driverId: {
    type: ObjectId,
    required: true
  },
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
  }
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

module.exports = mongoose.model('Tow', towSchema);
