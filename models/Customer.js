'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const { sequelize } = require('../config/database');

class Customer extends Model {}

Customer.init({
  name: DataTypes.STRING,
}, {
  sequelize: sequelize,
  modelName: 'Customer',
});

module.exports = Customer