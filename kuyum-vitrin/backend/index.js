// kuyum-vitrin/backend/index.js

const express = require('express');
const cors = require('cors');
const http = require('http');
const { connectToHaremAltin, getHaremAltinPrices } = require('./services/haremaltin.service');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Route to get the latest prices
app.get('/api/prices', (req, res) => {
  const prices = getHaremAltinPrices();
  if (prices.length === 0) {
    return res.status(503).json({
      message: 'Price data is not available yet. The service might be initializing.'
    });
  }
  res.json(prices);
});

// Authentication routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Start the Express server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // Connect to the Harem Altın WebSocket service to start receiving live data.
  connectToHaremAltin();
});
