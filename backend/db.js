const mysql = require("mysql");

export const db = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "ilelo123",
 database: "crud-basico",
});
