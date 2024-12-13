const { Pool } = require("pg");
const env = require("dotenv").config();

// Connect to the PostgreSQL database
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "PersonalFinanceManager",
  password: "1234567890",
  port: process.env.DB_PORT,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to DB", err);
  } else {
    console.log("Connected to DB", res.rows);
  }
});

pool.query(
  `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ); `,
  (err, res) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Users Table created successfully");
    }
  }
);

module.exports = pool;
