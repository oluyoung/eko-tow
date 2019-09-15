const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const driversLocationSchema = new mongoose.Schema({
  driverId: {
    type: ObjectId,
    required: true
  },
  coordinate: [Number],
  socketId: {
    type: String,
    required: true
  }
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

module.exports = mongoose.model('DriversLocation', driversLocationSchema);
