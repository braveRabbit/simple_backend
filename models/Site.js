"use strict";
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

class Site extends Model {}

Site.init(
  {
    name: DataTypes.STRING,
    refNumber1: DataTypes.TEXT,
    refNumber2: DataTypes.TEXT,
  },
  {
    sequelize: sequelize,
    modelName: "Site",
  }
);

module.exports = Site;
