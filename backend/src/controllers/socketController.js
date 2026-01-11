/**
 * Socket controller to emit live events:
 * - vehicleDetected
 * - violationRaised
 * - cameraStatus
 * - incidentUpdated
 *
 * Use: require and call attachSockets(server)
 */

const Vehicle = require('../models/vehicle');
const Violation = require('../models/Violation');
const Camera = require('../models/Camera');
const Incident = require('../models/Incident');

function attachSockets(httpServer) {
  const io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);
                                               
    // client may request to join a room for a camera or intersection
    socket.on('subscribe', (room) => {
      socket.join(room);
      console.log('Socket', socket.id, 'joined', room);
    });

    socket.on('unsubscribe', (room) => {
      socket.leave(room);
      console.log('Socket', socket.id, 'left', room);
});

    socket.on('simulateVehicle', async (payload) => {
      // payload: { plate, type, speed, lane, cameraId }
      try {
        const v = await Vehicle.create({ ...payload, timestamp: new Date() });
        io.emit('vehicleDetected', v);
        // if speed too high, create violation and broadcast
        if (v.speed > 80) {
          const viol = await Violation.create({ type: 'speeding', severity: 'high', plate: v.plate || null, speed: v.speed, cameraId: v.cameraId });
          io.emit('violationRaised', viol);
        }
      } catch (err) {
        console.error('simulateVehicle err', err);
      }
    });

    socket.on('simulateIncident', async (payload) => {
      try {
        const code = 'INC-' + Math.floor(1000 + Math.random() * 9000);
        const inc = await Incident.create({ code, ...payload });
        io.emit('incidentCreated', inc);
      } catch (err) {
        console.error('simulateIncident err', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

  // utility: background watchers to emit camera health and analytics
  setInterval(async () => {
    try {
      const cams = await Camera.find().limit(20);
      cams.forEach(cam => io.emit('cameraHealth', { id: cam._id, health: cam.health, fps: cam.fps }));
    } catch (err) {
      console.error('socket camera health broadcast error', err);
    }
  }, 10000);

  return io;
}

module.exports = { attachSockets };
