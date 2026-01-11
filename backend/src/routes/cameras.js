const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const Camera = require('../models/Camera');

const router = express.Router();

/**
 * GET /api/cameras
 */
router.get('/', auth, async (req, res, next) => {
  try {
    const cams = await Camera.find().sort({ name: 1 });
    res.json({ data: cams });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/cameras
 */
router.post(
  '/',
  auth,
  [ body('name').isString().isLength({ min: 1 }), body('location').optional().isString(), body('streamUrl').optional().isString() ],
  validate,
  async (req, res, next) => {
    try {
      const { name, location, streamUrl, fps } = req.body;
      const cam = await Camera.create({ name, location, streamUrl, fps: fps || 30 });
      res.json({ data: cam });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PUT /api/cameras/:id/health
 * body: { health }
 */
router.put('/:id/health', auth, async (req, res, next) => {
  try {
    const { health, fps } = req.body;
    const cam = await Camera.findByIdAndUpdate(req.params.id, { health, lastSeenAt: new Date(), fps }, { new: true });
    if (!cam) return res.status(404).json({ msg: 'Camera not found' });
    res.json({ data: cam });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
