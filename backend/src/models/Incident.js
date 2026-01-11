const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['accident','roadblock','hazard','breakdown','construction'], required: true },
  location: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['active','responding','resolved'], default: 'active' },
  affectedVehicles: { type: Number, default: 0 },
  emergencyUnits: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

IncidentSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Incident', IncidentSchema);
