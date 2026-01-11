const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const Violation = require('../models/Violation');

const router = express.Router();

/**
 * GET /api/violations
 */
router.get('/', auth, async (req, res, next) => {
  try {
    const since = req.query.since ? new Date(req.query.since) : new Date(Date.now() - 1000 * 60 * 60 * 24);
    const violations = await Violation.find({ timestamp: { $gte: since } }).sort({ timestamp: -1 }).limit(500);
    res.json({ data: violations });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/violations
 */
router.post(
  '/',
  auth,
  [
    body('type').isIn(['speeding','red_light','wrong_lane','parking','other']),
    body('severity').optional().isIn(['low','medium','high']),
    body('plate').optional().isString(),
    body('speed').optional().isNumeric(),
    body('location').optional().isString()
  ],
  validate,
  async (req, res, next) => {
    try {
      const v = await Violation.create(req.body);
      res.json({ data: v });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PUT /api/violations/:id/resolve
 */
router.put('/:id/resolve', auth, async (req, res, next) => {
  try {
    const v = await Violation.findByIdAndUpdate(req.params.id, { resolved: true }, { new: true });
    if (!v) return res.status(404).json({ msg: 'Violation not found' });
    res.json({ data: v });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
