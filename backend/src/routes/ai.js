const express = require('express');
const router  = express.Router();
const Groq    = require('groq-sdk');
const Crime   = require('../models/Crime');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/chat', async (req, res) => {
  try {
    const { messages, context } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array required' });
    }

    const [totalResult, topCatResult, topStateResult] = await Promise.all([
      Crime.aggregate([{ $group: { _id: null, total: { $sum: '$count' } } }]),
      Crime.aggregate([{ $group: { _id: '$category', total: { $sum: '$count' } } }, { $sort: { total: -1 } }, { $limit: 5 }]),
      Crime.aggregate([{ $group: { _id: '$state',    total: { $sum: '$count' } } }, { $sort: { total: -1 } }, { $limit: 5 }]),
    ]);

    const liveStats = {
      totalCrimes:   totalResult[0]?.total || 0,
      topCategories: topCatResult.map(c => `${c._id} (${c.total.toLocaleString()})`).join(', '),
      topStates:     topStateResult.map(s => `${s._id} (${s.total.toLocaleString()})`).join(', '),
    };

    const systemPrompt = `You are CrimeBot, an AI assistant for the India Crime Analytics Dashboard.
LIVE DATA: Total crimes=${liveStats.totalCrimes.toLocaleString()}, Top categories=${liveStats.topCategories}, Top states=${liveStats.topStates}.
Current filters — Year: ${context?.year}, State: ${context?.state}, Category: ${context?.category}.
Be concise and accurate. Only answer questions related to India crime statistics, trends, and state comparisons.`;

    // Build message history for Groq (OpenAI-compatible format)
    const chatMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({
        role:    m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      })),
    ];

    const result = await groq.chat.completions.create({
      model:       'llama-3.3-70b-versatile',
      messages:    chatMessages,
      max_tokens:  512,
      temperature: 0.7,
    });

    const reply = result.choices[0]?.message?.content || 'No response from AI.';
    res.json({ reply });

  } catch (err) {
    console.error('AI chat error:', err.message);
    res.status(500).json({ error: 'AI service error: ' + err.message });
  }
});

module.exports = router;