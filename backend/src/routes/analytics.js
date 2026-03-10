const express = require('express');
const router = express.Router();
const Crime = require('../models/Crime');

// GET dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    const { year, state } = req.query;
    let filter = {};
    
    if (year) filter.year = parseInt(year);
    if (state && state !== 'all') filter.state = state;
    
    // Total crimes
    const totalCrimes = await Crime.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: '$count' } } }
    ]);
    
    // Top crime category
    const topCategory = await Crime.aggregate([
      { $match: filter },
      { $group: { _id: '$category', total: { $sum: '$count' } } },
      { $sort: { total: -1 } },
      { $limit: 1 }
    ]);
    
    // Top state
    const topState = await Crime.aggregate([
      { $match: filter },
      { $group: { _id: '$state', total: { $sum: '$count' } } },
      { $sort: { total: -1 } },
      { $limit: 1 }
    ]);
    
    res.json({
      totalCrimes: totalCrimes[0]?.total || 0,
      topCategory: topCategory[0]?._id || 'N/A',
      topState: topState[0]?._id || 'N/A'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET crime trends over years
router.get('/trends', async (req, res) => {
  try {
    const { state, category } = req.query;
    let filter = {};
    
    if (state && state !== 'all') filter.state = state;
    if (category && category !== 'all') filter.category = category;
    
    const trends = await Crime.aggregate([
      { $match: filter },
      { $group: {
        _id: { year: '$year', category: '$category' },
        total: { $sum: '$count' }
      }},
      { $sort: { '_id.year': 1 } }
    ]);
    
    res.json(trends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET state-wise comparison
router.get('/comparison', async (req, res) => {
  try {
    const { year, category } = req.query;
    let filter = {};
    
    if (year) filter.year = parseInt(year);
    if (category && category !== 'all') filter.category = category;
    
    const comparison = await Crime.aggregate([
      { $match: filter },
      { $group: {
        _id: '$state',
        total: { $sum: '$count' },
        avgRate: { $avg: '$crimeRate' }
      }},
      { $sort: { total: -1 } }
    ]);
    
    res.json(comparison);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;