const Camera = require('../models/Camera');
const Vehicle = require('../models/vehicle');
const Violation = require('../models/Violation');
const Incident = require('../models/Incident');
const Signal = require('../models/Signal');
const AnalyticsSnapshot = require('../models/AnalyticsSnapshot');
const User = require('../models/User');
const bcrypt = require('bcrypt');

async function seedAll() {
  console.log('Seeding demo data...');
  // delete existing small dataset
  await Promise.all([
    Camera.deleteMany({}),
    Vehicle.deleteMany({}),
    Violation.deleteMany({}),
    Incident.deleteMany({}),
    Signal.deleteMany({}),
    AnalyticsSnapshot.deleteMany({}),
    User.deleteMany({})
  ]);
  // users
  const pass = await bcrypt.hash('password', 10);
  const admin = await User.create({ name: 'Admin User', email: 'admin@example.com', passwordHash: pass, role: 'admin' });
  const op = await User.create({ name: 'Operator', email: 'operator@example.com', passwordHash: pass, role: 'operator' });

  // cameras
  const cams = await Camera.create([
    { name: 'CAM-01', location: 'North Gate', fps: 56 },
    { name: 'CAM-02', location: 'South Junction', fps: 48 },
    { name: 'CAM-03', location: 'East Highway', fps: 64 },
    { name: 'CAM-04', location: 'West Plaza', fps: 72 }
  ]);

  // signals
  await Signal.create([
    { code: 'TL-01', intersection: 'Main St & 5th Ave', greenSeconds: 45, redSeconds: 30, vehiclesInQueue: 12 },
    { code: 'TL-02', intersection: 'Park Rd & Central', greenSeconds: 30, redSeconds: 45, vehiclesInQueue: 28 },
    { code: 'TL-03', intersection: 'Highway Exit 12', greenSeconds: 5, redSeconds: 60, vehiclesInQueue: 8 },
    { code: 'TL-04', intersection: 'Downtown Plaza', greenSeconds: 60, redSeconds: 40, vehiclesInQueue: 15 }
  ]);

  // create vehicles (historical)
  const vehicles = [];
  for (let i = 0; i < 200; i++) {
    const cam = cams[i % cams.length];
    vehicles.push({
      plate: `CAR-${1000 + i}`,
      type: (i % 7 === 0)?'truck':(i%5===0?'bus':'car'),
      speed: Math.round(20 + Math.random() * 80),
      lane: Math.floor(Math.random() * 4),
      timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60),
      cameraId: cam._id
    });
  }
  await Vehicle.insertMany(vehicles);

  // violations
  await Violation.create([
    { type: 'speeding', severity: 'high', plate: 'CAR-1001', speed: 120, cameraId: cams[0]._id, location: 'Highway 101' },
    { type: 'red_light', severity: 'medium', plate: 'BIKE-XY789', speed: 45, cameraId: cams[1]._id, location: 'Main St' }
  ]);

  // incidents
  await Incident.create([
    { code: 'INC-001', type: 'accident', location: 'Highway 12', description: 'Multi-vehicle collision', status: 'active', affectedVehicles: 3, emergencyUnits: 3 },
    { code: 'INC-002', type: 'roadblock', location: 'Main St', description: 'Construction', status: 'resolved', affectedVehicles: 1, emergencyUnits: 0 }
  ]);

  // analytics snapshots
  for (let i = 0; i < 8; i++) {
    await AnalyticsSnapshot.create({
      timestamp: new Date(Date.now() - i * 1000 * 60 * 60),
      totalVehicles: 50 + Math.round(Math.random() * 200),
      avgSpeed: Math.round(30 + Math.random() * 40),
      speedViolations: Math.round(Math.random() * 10),
      redLightViolations: Math.round(Math.random() * 6),
      occupancyByLane: [Math.round(Math.random()*100), Math.round(Math.random()*100), Math.round(Math.random()*100), Math.round(Math.random()*100)],
      aqi: Math.round(20 + Math.random() * 80),
      mlAccuracy: Math.round(80 + Math.random() * 15)
    });
  }

  console.log('Seeding completed. Users: admin@example.com & operator@example.com (password)');
}

module.exports = { seedAll };
