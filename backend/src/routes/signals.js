const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const Signal = require('../models/Signal');

const router = express.Router();

/**
 * GET /api/signals
 */
router.get('/', auth, async (req, res, next) => {
  try {
    const signals = await Signal.find().sort({ intersection: 1 });
    res.json({ data: signals });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/signals
 */
router.post(
  '/',
  auth,
  [ body('code').isString(), body('intersection').isString() ],
  validate,
  async (req, res, next) => {
    try {
      const s = await Signal.create(req.body);
      res.json({ data: s });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PUT /api/signals/:id/adjust
 * body: { greenSeconds, redSeconds }
 */
router.put('/:id/adjust', auth, async (req, res, next) => {
  try {
    const { greenSeconds, redSeconds } = req.body;
    const s = await Signal.findByIdAndUpdate(req.params.id, { greenSeconds, redSeconds, lastAdjustedAt: new Date() }, { new: true });
    if (!s) return res.status(404).json({ msg: 'Signal not found' });
    res.json({ data: s });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
