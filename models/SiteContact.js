"use strict";
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

class SiteContact extends Model {}

SiteContact.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
  },
  {
    sequelize: sequelize,
    modelName: "SiteContact",
  }
);

module.exports = SiteContact;
