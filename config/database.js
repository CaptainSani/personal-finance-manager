const { Pool } = require("pg");
const env = require("dotenv").config();

// Connect to the PostgreSQL database
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Required for Render PostgreSQL
  },
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

pool.query(
  `CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ); `,
  (err, res) => {
    if (err) {
      console.error("Error creating categories table:", err);
    } else {
      console.log("Categories Table created successfully");
    }
  }
);

pool.query(
    `CREATE TABLE IF NOT EXISTS budgets (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      total_amount DECIMAL(10, 2) NOT NULL,
      duration VARCHAR(20) NOT NULL,
      user_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    ); `,
    (err, res) => {
      if (err) {
        console.error("Error creating budgets table:", err);
      } else {
        console.log("Budgets Table created successfully");
      }
    }
  );
  
  pool.query(
    `CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      amount DECIMAL(10, 2) NOT NULL,
      category_id INTEGER NOT NULL,
      narration VARCHAR(200) NOT NULL,
      budget_id INTEGER,
      user_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (budget_id) REFERENCES budgets(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    ); `,
    (err, res) => {
      if (err) {
        console.error("Error creating transactions table:", err);
      } else {
        console.log("Transactions Table created successfully");
      }
    }
  );
  
  pool.query(
    `CREATE TABLE IF NOT EXISTS insights (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      total_income DECIMAL(10, 2) NOT NULL,
      total_expenses DECIMAL(10, 2) NOT NULL,
      remaining_budget DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    ); `,
    (err, res) => {
      if (err) {
        console.error("Error creating insights table:", err);
      } else {
        console.log("Insights Table created successfully");
      }
    }
  );

module.exports = pool;
