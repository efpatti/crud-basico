const mysql = require("mysql");

const db = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "ilelo123",
 database: "crud_basico",
});

module.exports = db;
