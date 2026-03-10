const express = require('express');
const router = express.Router();
const Crime = require('../models/Crime');

// GET all crimes with filters
router.get('/', async (req, res) => {
  try {
    const { year, state, category } = req.query;
    
    let filter = {};
    if (year) filter.year = parseInt(year);
    if (state && state !== 'all') filter.state = state;
    if (category && category !== 'all') filter.category = category;
    
    const crimes = await Crime.find(filter).sort({ year: -1, state: 1 });
    
    res.json({
      success: true,
      count: crimes.length,
      data: crimes
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET crime by ID
router.get('/:id', async (req, res) => {
  try {
    const crime = await Crime.findById(req.params.id);
    if (!crime) {
      return res.status(404).json({ error: 'Crime record not found' });
    }
    res.json(crime);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET crimes by state
router.get('/state/:stateName', async (req, res) => {
  try {
    const crimes = await Crime.find({ state: req.params.stateName })
      .sort({ year: -1 });
    res.json(crimes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all unique states
router.get('/list/states', async (req, res) => {
  try {
    const states = await Crime.distinct('state');
    res.json({ states: states.sort() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all unique crime categories
router.get('/list/categories', async (req, res) => {
  try {
    const categories = await Crime.distinct('category');
    res.json({ categories: categories.sort() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new crime record
router.post('/', async (req, res) => {
  try {
    const crime = new Crime(req.body);
    const saved = await crime.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;