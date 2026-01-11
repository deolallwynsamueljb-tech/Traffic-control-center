const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  plate: { type: String, required: true, index: true },
  type: { type: String, enum: ['car','truck','bus','bike','motorbike','unknown'], default: 'unknown' },
  speed: { type: Number, default: 0 },
  lane: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  cameraId: { type: mongoose.Schema.Types.ObjectId, ref: 'Camera' }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
