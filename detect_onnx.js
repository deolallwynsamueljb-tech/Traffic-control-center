// detect_onnx.js
const express = require('express');
const multer = require('multer');
const ort = require('onnxruntime-node');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });
const MODEL = path.join(__dirname, 'models', 'yolov8n.onnx'); // change filename if needed

let sessionPromise = null;
async function getSession() {
  if (!sessionPromise) {
    console.log('🧠 Loading YOLO model from:', MODEL);
    sessionPromise = ort.InferenceSession.create(MODEL)
      .then(sess => {
        console.log('✅ Model loaded. Input names:', sess.inputNames, 'Output names:', sess.outputNames);
        return sess;
      })
      .catch(err => { console.error('❌ Model load failed:', err.message || err); throw err; });
  }
  return sessionPromise;
}

async function preprocess(imagePath, size = 640) {
  const { data, info } = await sharp(imagePath)
    .resize(size, size, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const floatData = new Float32Array(width * height * channels);
  let p = 0;
  for (let c = 0; c < channels; c++) {
    for (let i = c; i < data.length; i += channels) {
      floatData[p++] = data[i] / 255.0;
    }
  }
  return { tensor: new ort.Tensor('float32', floatData, [1, channels, height, width]) };
}

function iou(a, b) {
  const [ax, ay, aw, ah] = a, [bx, by, bw, bh] = b;
  const ax1 = ax - aw / 2, ay1 = ay - ah / 2, ax2 = ax + aw / 2, ay2 = ay + ah / 2;
  const bx1 = bx - bw / 2, by1 = by - bh / 2, bx2 = bx + bw / 2, by2 = by + bh / 2;
  const interW = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));
  const interH = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));
  const inter = interW * interH;
  const areaA = aw * ah, areaB = bw * bh;
  return inter / (areaA + areaB - inter);
}

function nms(boxes, iouThresh = 0.45) {
  boxes.sort((a, b) => b.score - a.score);
  const kept = [];
  for (const b of boxes) {
    let keep = true;
    for (const k of kept) {
      if (k.class === b.class && iou(k.box, b.box) > iouThresh) { keep = false; break; }
    }
    if (keep) kept.push(b);
  }
  return kept;
}

function postprocess(outputTensor, confThresh = 0.25) {
  const data = outputTensor.data;
  const shape = outputTensor.dims;
  let rows = 0, cols = 0;
  if (shape.length === 3) { rows = shape[1]; cols = shape[2]; }
  else if (shape.length === 2) { rows = shape[0]; cols = shape[1]; }
  else throw new Error('Unexpected output shape: ' + shape.join(','));
  const dets = [];
  for (let r = 0; r < rows; r++) {
    const base = r * cols;
    const obj = data[base + 4];
    if (obj < confThresh) continue;
    let bestClass = -1, bestScore = 0;
    for (let c = 5; c < cols; c++) {
      const s = data[base + c];
      if (s > bestScore) { bestScore = s; bestClass = c - 5; }
    }
    const score = obj * bestScore;
    if (score < confThresh) continue;
    const x = data[base + 0], y = data[base + 1], w = data[base + 2], h = data[base + 3];
    dets.push({ class: bestClass, score, box: [x, y, w, h] });
  }
  return nms(dets, 0.45);
}

app.post('/api/detect', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
    if (!fs.existsSync(MODEL)) return res.status(500).json({ error: 'Model file not found on server' });
    const session = await getSession();
    const { tensor } = await preprocess(req.file.path, 640);
    const feeds = { [session.inputNames[0]]: tensor };
    const results = await session.run(feeds);
    const outName = Object.keys(results)[0];
    const detections = postprocess(results[outName], 0.25);
    res.json({ success: true, detections });
  } catch (err) {
    console.error('Detection error:', err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    try { if (req.file && req.file.path) fs.unlinkSync(req.file.path); } catch (e) {}
  }
});

app.listen(5000, () => console.log('🚦 YOLO Detection API running at http://localhost:5000/api/detect'));
