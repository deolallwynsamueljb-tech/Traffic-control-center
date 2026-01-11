 const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
  cameraId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: String,
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
    intersectionId: String
  },
  type: {
    type: String,
    enum: ['speed', 'anpr', 'counting', 'multi_purpose'],
    default: 'multi_purpose'
  },
  streamUrl: String,
  status: {
    type: String,
    enum: ['online', 'offline', 'maintenance'],
    default: 'online'
  },
  uptime: {
    type: Number,
    default: 100
  },
  fps: {
    type: Number,
    default: 30
  },
  resolution: {
    type: String,
    default: '1080p'
  },
  yoloModel: {
    type: String,
    default: 'yolov8'
  },
  detectionEnabled: {
    type: Boolean,
    default: true
  },
  vehiclesDetected: {
    type: Number,
    default: 0
  },
  violationsDetected: {
    type: Number,
    default: 0
  },
  lastFrame: {
    timestamp: Date,
    vehicleCount: Number
  },
  health: {
    cpuUsage: Number,
    memoryUsage: Number,
    processingTime: Number
  },
  calibration: {
    speedAccuracy: Number,
    detectionAccuracy: Number
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

cameraSchema.methods.updateHealth = function(cpuUsage, memoryUsage, processingTime) {
  this.health = {
    cpuUsage,
    memoryUsage,
    processingTime
  };
  this.lastUpdated = new Date();
  return this.save();
};

cameraSchema.methods.recordDetection = function(vehicleCount) {
  this.lastFrame = {
    timestamp: new Date(),
    vehicleCount
  };
  this.vehiclesDetected = (this.vehiclesDetected || 0) + vehicleCount;
  return this.save();
};

const Camera = mongoose.model('Camera', cameraSchema);

module.exports = Camera;