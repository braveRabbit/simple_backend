'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const { sequelize } = require('../config/database');

class Location extends Model {}

Location.init({
  address: DataTypes.STRING,
  city: DataTypes.STRING,
  country: DataTypes.STRING,
  state: DataTypes.STRING,
  postalCode: DataTypes.STRING,
  latitude: DataTypes.DOUBLE,
  longitude: DataTypes.DOUBLE
}, {
  sequelize: sequelize,
  modelName: 'Location',
});

module.exports = Location 