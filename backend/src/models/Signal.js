const mongoose = require('mongoose');

const SignalSchema = new mongoose.Schema({
  code: { type: String, required: true },
  intersection: { type: String, required: true },
  greenSeconds: { type: Number, default: 30 },
  redSeconds: { type: Number, default: 30 },
  lastAdjustedAt: { type: Date, default: Date.now },
  enabled: { type: Boolean, default: true },
  vehiclesInQueue: { type: Number, default: 0 }
});

module.exports = mongoose.model('Signal', SignalSchema);
