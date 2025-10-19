// kuyum-vitrin/backend/models/livePrice.model.js

/**
 * LivePrice Model
 *
 * Stores the live prices of gold, silver, and currencies fetched from external sources.
 * This table will be updated frequently (e.g., every minute).
 */
const LivePrice = {
  id: { type: 'INTEGER', primaryKey: true, autoIncrement: true },

  // The type of asset (e.g., 'GOLD', 'SILVER', 'CURRENCY')
  assetType: { type: 'STRING', allowNull: false },

  // A unique code for the asset (e.g., 'XAU' for Gold, 'USD' for US Dollar)
  assetCode: { type: 'STRING', allowNull: false, unique: true },

  // The price is stored in a consistent base currency, e.g., TRY.
  buyPrice: { type: 'FLOAT', allowNull: false },
  sellPrice: { type: 'FLOAT', allowNull: false },

  // Information about the data source
  source: { type: 'STRING', allowNull: true }, // e.g., 'datshop.com.tr', 'haremaltin.com'

  // The timestamp of the last successful update
  lastUpdatedAt: { type: 'DATE', allowNull: false }
};

module.exports = LivePrice;
