require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware - MUST be first!
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('✅ Middleware loaded');

// -------------------- Mongoose models --------------------
const { Schema } = mongoose;

// transform _id to id and remove __v
function addToJSON(schema) {
  if (!schema.options.toJSON) schema.options.toJSON = {};
  schema.options.toJSON.transform = function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  };
}

// Traffic schema
const trafficSchema = new Schema({
  location: { type: String, required: true },
  level: { type: Number, required: true },
  vehicles: { type: Number, default: 0 },
  speed: { type: Number, default: 0 }
}, { timestamps: true });
addToJSON(trafficSchema);
const Traffic = mongoose.model('Traffic', trafficSchema);

// Vehicle schema
const vehicleSchema = new Schema({
  type: { type: String, required: true },
  plate: { type: String, required: true },
  location: { type: String, default: 'Unknown' },
  speed: { type: Number, default: 0 }
}, { timestamps: true });
addToJSON(vehicleSchema);
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// -------------------- Routes --------------------

// ROOT endpoint
app.get('/', (req, res) => {
  console.log('GET / called');
  res.json({
    message: '🚦 Traffic Backend Running (MongoDB)!',
    version: '1.0.0',
    status: 'OK',
    endpoints: {
      traffic: '/api/traffic',
      vehicles: '/api/vehicles'
    }
  });
});

app.get('/health', (req, res) => {
  console.log('GET /health called');
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// ---------- TRAFFIC ENDPOINTS ----------

// GET all traffic
app.get('/api/traffic', async (req, res) => {
  console.log('GET /api/traffic called');
  try {
    const data = await Traffic.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data, count: data.length, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Error in GET /api/traffic:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET traffic by id
app.get('/api/traffic/:id', async (req, res) => {
  console.log('GET /api/traffic/:id called with id:', req.params.id);
  try {
    const doc = await Traffic.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ success: false, error: 'Traffic not found' });
    res.json({ success: true, data: doc });
  } catch (error) {
    console.error('Error in GET /api/traffic/:id:', error);
    res.status(400).json({ success: false, error: 'Invalid id or server error' });
  }
});

// POST create traffic
app.post('/api/traffic', async (req, res) => {
  console.log('POST /api/traffic called with body:', req.body);
  try {
    const { location, level, vehicles, speed } = req.body;
    if (!location || level === undefined) {
      return res.status(400).json({ success: false, error: 'Missing: location and level required' });
    }
    const newTraffic = await Traffic.create({
      location,
      level: Number(level),
      vehicles: vehicles !== undefined ? Number(vehicles) : 0,
      speed: speed !== undefined ? Number(speed) : 0
    });
    res.status(201).json({ success: true, data: newTraffic, message: 'Traffic created' });
  } catch (error) {
    console.error('Error in POST /api/traffic:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT update traffic
app.put('/api/traffic/:id', async (req, res) => {
  console.log('PUT /api/traffic/:id called with id:', req.params.id, 'body:', req.body);
  try {
    const update = {};
    const { location, level, vehicles, speed } = req.body;
    if (location !== undefined) update.location = location;
    if (level !== undefined) update.level = Number(level);
    if (vehicles !== undefined) update.vehicles = Number(vehicles);
    if (speed !== undefined) update.speed = Number(speed);

    const updated = await Traffic.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, error: 'Traffic not found' });
    res.json({ success: true, data: updated, message: 'Traffic updated' });
  } catch (error) {
    console.error('Error in PUT /api/traffic/:id:', error);
    res.status(400).json({ success: false, error: 'Invalid id or request' });
  }
});

// DELETE traffic
app.delete('/api/traffic/:id', async (req, res) => {
  console.log('DELETE /api/traffic/:id called with id:', req.params.id);
  try {
    const deleted = await Traffic.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Traffic not found' });
    res.json({ success: true, data: deleted, message: 'Traffic deleted' });
  } catch (error) {
    console.error('Error in DELETE /api/traffic/:id:', error);
    res.status(400).json({ success: false, error: 'Invalid id or server error' });
  }
});

// ---------- VEHICLE ENDPOINTS ----------

// GET all vehicles
app.get('/api/vehicles', async (req, res) => {
  console.log('GET /api/vehicles called');
  try {
    const data = await Vehicle.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data, count: data.length, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Error in GET /api/vehicles:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET vehicle by id
app.get('/api/vehicles/:id', async (req, res) => {
  console.log('GET /api/vehicles/:id called with id:', req.params.id);
  try {
    const doc = await Vehicle.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ success: false, error: 'Vehicle not found' });
    res.json({ success: true, data: doc });
  } catch (error) {
    console.error('Error in GET /api/vehicles/:id:', error);
    res.status(400).json({ success: false, error: 'Invalid id or server error' });
  }
});

// POST create vehicle
app.post('/api/vehicles', async (req, res) => {
  console.log('POST /api/vehicles called with body:', req.body);
  try {
    const { type, plate, location, speed } = req.body;
    if (!type || !plate) return res.status(400).json({ success: false, error: 'Missing: type and plate required' });

    const newVehicle = await Vehicle.create({
      type,
      plate,
      location: location || 'Unknown',
      speed: speed !== undefined ? Number(speed) : 0
    });
    res.status(201).json({ success: true, data: newVehicle, message: 'Vehicle created' });
  } catch (error) {
    console.error('Error in POST /api/vehicles:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT update vehicle
app.put('/api/vehicles/:id', async (req, res) => {
  console.log('PUT /api/vehicles/:id called with id:', req.params.id, 'body:', req.body);
  try {
    const update = {};
    const { type, plate, location, speed } = req.body;
    if (type !== undefined) update.type = type;
    if (plate !== undefined) update.plate = plate;
    if (location !== undefined) update.location = location;
    if (speed !== undefined) update.speed = Number(speed);

    const updated = await Vehicle.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, error: 'Vehicle not found' });
    res.json({ success: true, data: updated, message: 'Vehicle updated' });
  } catch (error) {
    console.error('Error in PUT /api/vehicles/:id:', error);
    res.status(400).json({ success: false, error: 'Invalid id or request' });
  }
});

// DELETE vehicle
app.delete('/api/vehicles/:id', async (req, res) => {
  console.log('DELETE /api/vehicles/:id called with id:', req.params.id);
  try {
    const deleted = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Vehicle not found' });
    res.json({ success: true, data: deleted, message: 'Vehicle deleted' });
  } catch (error) {
    console.error('Error in DELETE /api/vehicles/:id:', error);
    res.status(400).json({ success: false, error: 'Invalid id or server error' });
  }
});

// 404 handler
app.use((req, res) => {
  console.log('404 - Route not found:', req.method, req.path);
  res.status(404).json({ success: false, error: 'Route not found', path: req.path, method: req.method });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(500).json({ success: false, error: 'Server error', message: err.message });
});

// -------------------- Connect to MongoDB and start server --------------------
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not set in environment. Please set it in .env');
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log('');
    console.log('╔════════════════════════════════════════╗');
    console.log('║  🚦 TRAFFIC BACKEND RUNNING (Mongo)    ║');
    console.log('╚════════════════════════════════════════╝');
    console.log('');
    console.log('🌐 URL: http://localhost:' + PORT);
    console.log('');
    console.log('📍 Test endpoints:');
    console.log('   GET  http://localhost:' + PORT + '/api/traffic');
    console.log('   GET  http://localhost:' + PORT + '/api/vehicles');
    console.log('');
  });
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

 