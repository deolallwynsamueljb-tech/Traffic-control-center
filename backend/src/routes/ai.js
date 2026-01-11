const express = require('express');
const auth = require('../middleware/auth');
const { predictTraffic } = require('../utils/lruPredictor');

const router = express.Router();

/**
 * POST /api/ai/predict
 * body: { avgSpeed, totalVehicles, timestamp }
 * Returns traffic forecasts (mocked)
 */
router.post('/predict', auth, async (req, res, next) => {
  try {
    const { avgSpeed = 40, totalVehicles = 120, timestamp } = req.body || {};
    const result = predictTraffic({ avgSpeed: Number(avgSpeed), totalVehicles: Number(totalVehicles), timestamp: timestamp ? new Date(timestamp) : Date.now() });
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/ai/signal-recommendation
 * body: { signalId, snapshot }
 * Returns a recommended adjustment (mock)
 */
router.post('/signal-recommendation', auth, async (req, res, next) => {
  try {
    // simple heuristic: if avgSpeed low and totalVehicles high -> extend green
    const { signalId, snapshot } = req.body;
    const avgSpeed = snapshot?.avgSpeed ?? 40;
    const totalVehicles = snapshot?.totalVehicles ?? 120;
    const rec = (avgSpeed < 30 && totalVehicles > 150) ? { strategy: 'extend_green', amount: 15 } : (avgSpeed < 50 ? { strategy: 'adaptive', amount: 7 } : { strategy: 'balanced', amount: 0 });
    res.json({ data: { model: 'mock-rl-signal', recommendation: rec } });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
