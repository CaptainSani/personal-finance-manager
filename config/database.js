const { Pool } = require("pg");
const env = require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  connectionTimeoutMillis: 60000,
  ssl: {
    rejectUnauthorized: false,
    require: true,
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
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
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
  `DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_type') THEN
        CREATE TYPE transaction_type AS ENUM ('income', 'expenses');
    END IF;
END$$;
    
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      amount DECIMAL(10, 2) NOT NULL,
      category VARCHAR(20) NOT NULL,
      narration VARCHAR(200) NOT NULL,
      transaction_type transaction_type NOT NULL,
      budget_id INTEGER,
      user_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

module.exports = pool;
