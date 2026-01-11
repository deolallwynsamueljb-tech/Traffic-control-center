const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const Incident = require('../models/Incident');

const router = express.Router();

/**
 * GET /api/incidents
 */
router.get('/', auth, async (req, res, next) => {
  try {
    const incidents = await Incident.find().sort({ updatedAt: -1 }).limit(200);
    res.json({ data: incidents });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/incidents
 */
router.post(
  '/',
  auth,
  [
    body('code').isString(),
    body('type').isIn(['accident','roadblock','hazard','breakdown','construction']),
    body('location').isString()
  ],
  validate,
  async (req, res, next) => {
    try {
      const inc = await Incident.create(req.body);
      res.json({ data: inc });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PUT /api/incidents/:id
 */
router.put('/:id', auth, async (req, res, next) => {
  try {
    const inc = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inc) return res.status(404).json({ msg: 'Incident not found' });
    res.json({ data: inc });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
