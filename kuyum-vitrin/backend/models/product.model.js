// kuyum-vitrin/backend/models/product.model.js

/**
 * Product Model
 *
 * Represents a jewelry product in the showcase.
 * It includes fields for detailed specifications and pricing logic.
 */
const Product = {
  id: { type: 'INTEGER', primaryKey: true, autoIncrement: true },
  name: { type: 'STRING', allowNull: false },
  description: { type: 'TEXT', allowNull: true },
  images: { type: 'ARRAY(STRING)', allowNull: false }, // URLs to product images

  // Core Attributes
  karat: { type: 'INTEGER', allowNull: false }, // e.g., 14, 22, 24
  purity: { type: 'FLOAT', allowNull: false }, // e.g., 585, 916, 1000 (millesimal fineness)
  weight: { type: 'FLOAT', allowNull: false }, // in grams
  category: { type: 'STRING', allowNull: false }, // e.g., Ring, Necklace, Bracelet

  // Craftsmanship & Pricing
  // This value can represent different things based on the seller's choice:
  // - For B2B (millesimal): It's the "milyem" value. e.g., 45 for a 10g item means 0.45g of pure gold.
  // - For B2C (cash): It's the direct labor cost in a specific currency.
  craftsmanshipCost: { type: 'FLOAT', allowNull: false },
  pricingType: { type: 'ENUM', values: ['MILYESIMAL', 'CASH'], allowNull: false },

  // Optional Details
  modelCode: { type: 'STRING', allowNull: true },
  patentInfo: { type: 'STRING', allowNull: true }, // Patent number or name
  salesPeriod: { type: 'STRING', allowNull: true }, // e.g., "New Season", "Outlet"

  // Foreign Key to the seller (a B2B User)
  sellerId: { type: 'INTEGER', allowNull: false, references: { model: 'Users', key: 'id' } },

  createdAt: { type: 'DATE', defaultValue: 'NOW' },
  updatedAt: { type: 'DATE', defaultValue: 'NOW' }
};

module.exports = Product;
