const { Sequelize } = require("sequelize");
// const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
  logging: false,
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Database is connected successfully!!!");
  } catch (e) {
    console.log("Error connecting db");
    console.log(e);
  }
};

// const connection = mysql
//   .createConnection({
//     host: DB_HOST,
//     user: DB_USER,
//     database: DB_NAME,
//   })
//   .then(() => {
//     console.log("MySql Database is connected");
//   })
//   .catch(() => {
//     console.log("Database error");
//   });

module.exports = { connectToDatabase, sequelize };
