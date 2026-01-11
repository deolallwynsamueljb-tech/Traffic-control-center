const mongoose = require('mongoose');

const ViolationSchema = new mongoose.Schema({
  type: { type: String, enum: ['speeding','red_light','wrong_lane','parking','other'], required: true },
  severity: { type: String, enum: ['low','medium','high'], default: 'low' },
  plate: { type: String, default: null },
  vehicleType: { type: String, default: null },
  speed: { type: Number, default: 0 },
  cameraId: { type: mongoose.Schema.Types.ObjectId, ref: 'Camera' },
  location: { type: String },
  timestamp: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Violation', ViolationSchema);
