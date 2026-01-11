// src/routes/vehicles.js
const express = require('express');
const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');

const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const Vehicle = require('../models/vehicle');

const router = express.Router();

/**
 * GET /api/vehicles
 * Query params:
 *   - limit (optional) -> numeric, max 1000
 *   - since (optional) -> ISO timestamp or millis
 */
router.get(
  '/',
  auth,
  [
    query('limit').optional().isInt({ min: 1, max: 1000 }).toInt(),
    query('since').optional().isISO8601().toDate()
    // Accepts ISO8601 date string; if you prefer millis, remove isISO8601
  ],
  validate,
  async (req, res, next) => {
    try {
      const limit = req.query.limit ?? 500;
      // if since provided by express-validator it will be a Date due to toDate()
      const since = req.query.since ?? new Date(Date.now() - 1000 * 60 * 60); // default last 1 hour

      // Query vehicles newer than `since` and order desc
      const vehicles = await Vehicle.find({ timestamp: { $gte: since } })
        .sort({ timestamp: -1 })
        .limit(Number(limit));

      return res.json({ data: vehicles });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/vehicles
 * create a vehicle detection entry (used by camera ingestion)
 */
router.post(
  '/',
  auth,
  [
    body('plate').optional().isString().trim(),
    body('type').optional().isIn(['car', 'truck', 'bus', 'bike', 'motorbike', 'unknown']),
    body('speed').optional().isNumeric().toFloat(),
    body('lane').optional().isInt({ min: 0 }).toInt(),
    body('cameraId').optional().isString().custom((value) => {
      if (!mongoose.isValidObjectId(value)) throw new Error('cameraId must be a valid ObjectId');
      return true;
    })
  ],
  validate,
  async (req, res, next) => {
    try {
      const { plate, type, speed, lane, cameraId } = req.body;

      // sanitize numeric fields and provide defaults
      const parsedSpeed = typeof speed === 'number' && !Number.isNaN(speed) ? speed : 0;
      const parsedLane = typeof lane === 'number' && !Number.isNaN(lane) ? lane : 0;

      const v = await Vehicle.create({
        plate: plate || null,
        type: type || 'unknown',
        speed: parsedSpeed,
        lane: parsedLane,
        cameraId: cameraId || undefined,
        timestamp: new Date()
      });

      return res.status(201).json({ data: v });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/vehicles/:id
 */
router.get(
  '/:id',
  auth,
  [
    param('id').custom((value) => {
      if (!mongoose.isValidObjectId(value)) throw new Error('Invalid vehicle id');
      return true;
    })
  ],
  validate,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const v = await Vehicle.findById(id);
      if (!v) return res.status(404).json({ msg: 'Vehicle not found' });
      return res.json({ data: v });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
