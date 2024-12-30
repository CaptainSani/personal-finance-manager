const pool = require("../config/database");

// Insert a new transaction
const createTransaction = async (transaction) => {
  const { amount, narration, category, budget_id, user_id } = transaction;
  const query = `
      INSERT INTO transactions (amount, narration, category, budget_id, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
  const values = [amount, narration, category, budget_id, user_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get all transactions
const getAllTransactions = async (user_id, filters = {}) => {
  const { date, category, budget } = filters;
  let query = `SELECT * FROM transactions WHERE user_id = $1`;
  const values = [user_id];

  if (date) {
    query += ` AND DATE(created_at) = $2`;
    values.push(date);
  }

  if (category) {
    query += ` AND category = $${values.length + 1}`;
    values.push(category);
  }

  if (budget) {
    query += ` AND budget_id = $${values.length + 1}`;
    values.push(budget);
  }

  const result = await pool.query(query, values);
  return result.rows;
};

// Get a single transaction by ID
const getTransactionById = async (id, user_id) => {
  const query = `SELECT * FROM transactions WHERE id = $1 AND user_id = $2`;
  const result = await pool.query(query, [id, user_id]);
  return result.rows[0];
};

// Update a transaction
const updateTransaction = async (id, user_id, updatedData) => {
  const { amount, narration, category } = updatedData;
  const query = `
      UPDATE transactions
      SET amount = $1, narration = $2, category = $3,
      WHERE id = $4 AND user_id = $5
      RETURNING *;
    `;
  const values = [amount, narration, category, id, user_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete a transaction
const deleteTransaction = async (id, user_id) => {
  const query = `DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *`;
  const result = await pool.query(query, [id, user_id]);
  return result.rows[0];
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
