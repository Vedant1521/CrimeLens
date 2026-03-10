require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');


const app = express();

app.use(cors({ origin: '*', credentials: true, optionsSuccessStatus: 200 }));
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crime-data';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => { console.error('❌ MongoDB Error:', err.message); process.exit(1); });

// Routes
app.use('/api/crimes',    require('./routes/crimes'));
app.use('/api/states',    require('./routes/states'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/ai',        require('./routes/ai'));

app.get('/',       (req, res) => res.json({ message: '🇮🇳 India Crime Analytics API', version: '3.0.0' }));
app.get('/health', (req, res) => res.json({ status: 'OK' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));
