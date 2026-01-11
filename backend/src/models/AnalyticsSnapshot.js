const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  totalVehicles: { type: Number, default: 0 },
  avgSpeed: { type: Number, default: 0 },
  speedViolations: { type: Number, default: 0 },
  redLightViolations: { type: Number, default: 0 },
  occupancyByLane: { type: [Number], default: [] },
  aqi: { type: Number, default: 0 },
  mlAccuracy: { type: Number, default: 0 }
});

module.exports = mongoose.model('AnalyticsSnapshot', AnalyticsSchema);
