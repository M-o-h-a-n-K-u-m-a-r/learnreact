const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store (replace with database in production)
let bronzeFrameSizes = [
  { id: 1, name: 'Square', size: '10x10', status: 'active' },
  { id: 2, name: 'Rectangle', size: '20x10', status: 'active' }
];
let nextId = 3;

// Get all bronze frame sizes
app.get('/api/bronze-frame-sizes', (req, res) => {
  res.json(bronzeFrameSizes);
});

// Add new bronze frame size
app.post('/api/bronze-frame-sizes', (req, res) => {
  const { name, size } = req.body;
  if (!name || !size) {
    return res.status(400).json({ error: 'Name and size are required' });
  }
  const exists = bronzeFrameSizes.some(item => item.name === name && item.size === size);
  if (exists) {
    return res.status(409).json({ error: 'Frame size already exists' });
  }
  const newItem = { id: nextId++, name, size, status: 'active' };
  bronzeFrameSizes.push(newItem);
  res.status(201).json(newItem);
});

// Update existing bronze frame size
app.put('/api/bronze-frame-sizes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, size } = req.body;
  if (!name || !size) {
    return res.status(400).json({ error: 'Name and size are required' });
  }
  const index = bronzeFrameSizes.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Frame size not found' });
  }
  const exists = bronzeFrameSizes.some(item => item.name === name && item.size === size && item.id !== id);
  if (exists) {
    return res.status(409).json({ error: 'Frame size already exists' });
  }
  bronzeFrameSizes[index] = { id, name, size, status: bronzeFrameSizes[index].status };
  res.json(bronzeFrameSizes[index]);
});

// Delete bronze frame size
app.delete('/api/bronze-frame-sizes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = bronzeFrameSizes.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Frame size not found' });
  }
  bronzeFrameSizes.splice(index, 1);
  res.status(204).send();
});

// Change status of bronze frame size
app.patch('/api/bronze-frame-sizes/:id/status', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  if (!status || !['active', 'inactive'].includes(status)) {
    return res.status(400).json({ error: 'Valid status is required' });
  }
  const index = bronzeFrameSizes.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Frame size not found' });
  }
  bronzeFrameSizes[index].status = status;
  res.json(bronzeFrameSizes[index]);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});