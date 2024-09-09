const mysql = require("mysql2");
const util = require("util");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Snake9090",
  database: "Vegetable_Management",
  port: "3307",
});

db.query = util.promisify(db.query).bind(db);

module.exports = db;
