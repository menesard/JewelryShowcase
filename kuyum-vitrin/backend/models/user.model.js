// kuyum-vitrin/backend/models/user.model.js

/**
 * User Model
 *
 * Represents a user in the system.
 * This initial version is focused on B2C clients.
 * It will be extended to support B2B roles (Producer, Marketer, etc.).
 */
const User = {
  id: { type: 'INTEGER', primaryKey: true, autoIncrement: true },
  fullName: { type: 'STRING', allowNull: false },
  email: { type: 'STRING', allowNull: false, unique: true },
  password: { type: 'STRING', allowNull: false }, // Will be stored as a hash
  role: { type: 'ENUM', values: ['B2C_CUSTOMER', 'B2B_JEWELER', 'ADMIN'], defaultValue: 'B2C_CUSTOMER' },

  // Fields for B2B users (to be used in Phase 2)
  companyName: { type: 'STRING', allowNull: true },
  taxNumber: { type: 'STRING', allowNull: true },
  jewelerType: { type: 'ENUM', values: ['Producer', 'Marketer', 'Showcase', 'Refiner'], allowNull: true },

  createdAt: { type: 'DATE', defaultValue: 'NOW' },
  updatedAt: { type: 'DATE', defaultValue: 'NOW' }
};

module.exports = User;
