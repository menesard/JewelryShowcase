// kuyum-vitrin/backend/services/haremaltin.service.js

const { io } = require('socket.io-client');

// This will store the latest price data received from the socket.
let livePrices = [];

/**
 * Connects to the Harem Altın WebSocket server and listens for live price data.
 * Updates the in-memory `livePrices` array.
 */
function connectToHaremAltin() {
  // Found the server address from the website's source code.
  const socket = io('https://www.haremaltin.com:2121', {
    transports: ['websocket']
  });

  socket.on('connect', () => {
    console.log('Successfully connected to Harem Altın WebSocket server.');
    // The source code shows that we need to subscribe to the 'l' channel to get live data.
    socket.emit('l');
  });

  socket.on('l', (data) => {
    // The data comes in a structured format. We need to parse and standardize it.
    const updatedPrices = parseAndStandardize(data);

    // Update the existing prices or add new ones.
    updatedPrices.forEach(newPrice => {
        const index = livePrices.findIndex(p => p.assetCode === newPrice.assetCode);
        if (index !== -1) {
            livePrices[index] = newPrice; // Update existing
        } else {
            livePrices.push(newPrice); // Add new
        }
    });
  });

  socket.on('disconnect', (reason) => {
    console.warn('Disconnected from Harem Altın WebSocket:', reason);
    // Optional: Implement reconnection logic here.
  });

  socket.on('connect_error', (error) => {
    console.error('Harem Altın WebSocket connection error:', error.message);
  });
}

/**
 * Parses the raw data from the socket and maps it to our standard format.
 * @param {object} data - The raw data object from the WebSocket.
 * @returns {Array<object>} - An array of standardized price objects.
 */
function parseAndStandardize(data) {
    const prices = [];
    if (data && data.data) {
        for (const key in data.data) {
            const item = data.data[key];
            const assetCode = mapAssetCode(key);
            if (assetCode && item.satis && item.alis) {
                prices.push({
                    assetCode: assetCode,
                    buyPrice: parseFloat(item.alis.replace(',', '.')),
                    sellPrice: parseFloat(item.satis.replace(',', '.')),
                    source: 'haremaltin.com',
                    lastUpdatedAt: new Date()
                });
            }
        }
    }
    return prices;
}

/**
 * Maps Harem Altın's specific codes to our internal standard codes.
 * @param {string} code - The code from the WebSocket data (e.g., '24').
 * @returns {string|null} - Our standardized code (e.g., 'XAU_24K') or null.
 */
function mapAssetCode(code) {
    const mapping = {
        '24': 'XAU_24K_GR', // Gram Altın (24 Ayar)
        '22': 'XAU_22K_GR', // Gram Altın (22 Ayar)
        'CK': 'XAU_CEYREK', // Çeyrek Altın
        'YK': 'XAU_YARIM',  // Yarım Altın
        'TK': 'XAU_TAM',    // Tam Altın
        'USD': 'USD_TRY',   // Dolar/TL
        'EUR': 'EUR_TRY'    // Euro/TL
    };
    return mapping[code] || null;
}

/**
 * Returns the latest prices received from the WebSocket.
 * @returns {Array<object>}
 */
function getHaremAltinPrices() {
  return livePrices;
}

module.exports = {
  connectToHaremAltin,
  getHaremAltinPrices
};
