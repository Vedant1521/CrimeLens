const express = require('express');
const router = express.Router();

const states = [
  { id: 1, name: 'Maharashtra', code: 'MH' },
  { id: 2, name: 'Delhi', code: 'DL' },
  { id: 3, name: 'Karnataka', code: 'KA' },
  { id: 4, name: 'Tamil Nadu', code: 'TN' },
  { id: 5, name: 'Uttar Pradesh', code: 'UP' }
];

// GET all states
router.get('/', (req, res) => {
  res.json({ states });
});

// GET state details
router.get('/:stateId', (req, res) => {
  const state = states.find(s => s.id === parseInt(req.params.stateId));
  if (!state) {
    return res.status(404).json({ error: 'State not found' });
  }
  res.json(state);
});

module.exports = router;