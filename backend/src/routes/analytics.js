const express = require('express');
const auth = require('../middleware/auth');
const AnalyticsSnapshot = require('../models/AnalyticsSnapshot');
const Vehicle = require('../models/vehicle');
const Violation = require('../models/Violation');

const router = express.Router();

/**
 * GET /api/analytics/latest
 * returns latest aggregated snapshot (and if none, compute from recent data)
 */
router.get('/latest', auth, async (req, res, next) => {
  try {
    let snap = await AnalyticsSnapshot.findOne().sort({ timestamp: -1 });
    if (snap) return res.json({ data: snap });

    // compute basic snapshot from recent vehicles/violations
    const since = new Date(Date.now() - 1000 * 60 * 60); // last hour
    const vehicles = await Vehicle.find({ timestamp: { $gte: since } });
    const violations = await Violation.find({ timestamp: { $gte: since } });

    const totalVehicles = vehicles.length;
    const avgSpeed = vehicles.length ? Math.round(vehicles.reduce((s, v) => s + (v.speed || 0), 0) / vehicles.length) : 0;
    const speedViolations = violations.filter(v => v.type === 'speeding').length;
    const redLightViolations = violations.filter(v => v.type === 'red_light').length;
    const occupancyByLane = [0,0,0,0];
    vehicles.forEach(v => { if (typeof v.lane === 'number' && v.lane >= 0 && v.lane < occupancyByLane.length) occupancyByLane[v.lane]++; });

    snap = await AnalyticsSnapshot.create({
      timestamp: new Date(),
      totalVehicles,
      avgSpeed,
      speedViolations,
      redLightViolations,
      occupancyByLane,
      aqi: Math.round(20 + Math.random() * 80),
      mlAccuracy: Math.round(80 + Math.random() * 15)
    });

    res.json({ data: snap });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/analytics/history
 * returns last N snapshots
 */
router.get('/history', auth, async (req, res, next) => {
  try {
    const limit = Math.min(200, parseInt(req.query.limit || '50', 10));
    const snaps = await AnalyticsSnapshot.find().sort({ timestamp: -1 }).limit(limit);
    res.json({ data: snaps });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
