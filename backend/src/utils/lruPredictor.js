/**
 * A lightweight mock predictor to simulate LSTM/RL outputs
 * Returns congestion forecast for next 15/30/60 minutes and recommended signal adjustments.
 *
 * This is deterministic pseudo-ML: based on recent avgSpeed, totalVehicles, hourOfDay.
 */

function predictTraffic({ avgSpeed = 40, totalVehicles = 120, timestamp = Date.now() }) {
  const hour = new Date(timestamp).getHours();
  const demandFactor = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19) ? 1.4 : 1.0;
  const congestionScore = Math.max(0, Math.min(100, Math.round((1 - avgSpeed / 80) * 100 * demandFactor)));
  const next15 = Math.round(congestionScore * 0.9 + (Math.random() * 6 - 3));
  const next30 = Math.round(congestionScore * 1.0 + (Math.random() * 6 - 3));
  const next60 = Math.round(congestionScore * 1.05 + (Math.random() * 8 - 4));

  // simple signal recommendations:
  const adjustSignals = (congestionScore > 70) ? { strategy: 'extend_green', amount: 10 } : (congestionScore > 40 ? { strategy: 'adaptive', amount: 5 } : { strategy: 'balanced', amount: 0 });

  return {
    model: 'mock-lstm-v1',
    next15: { congestion: Math.max(0, Math.min(100, next15)), label: labelFor(next15) },
    next30: { congestion: Math.max(0, Math.min(100, next30)), label: labelFor(next30) },
    next60: { congestion: Math.max(0, Math.min(100, next60)), label: labelFor(next60) },
    confidence: Math.round(70 + Math.random() * 25),
    recommendedSignalAdjustment: adjustSignals
  };
}

function labelFor(score) {
  if (score >= 80) return 'High Congestion';
  if (score >= 50) return 'Medium Congestion';
  return 'Low Congestion';
}

module.exports = { predictTraffic };
