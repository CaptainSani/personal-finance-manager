const pool = require("../config/database");

const createTransaction = async (transaction) => {
  const { amount, narration, category, transaction_type, budget_id, user_id } =
    transaction;
  const query = `
      INSERT INTO transactions (amount, narration, category, transaction_type, budget_id, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
  const values = [
    amount,
    narration,
    category,
    transaction_type,
    budget_id,
    user_id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

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

const getTransactionById = async (id, user_id) => {
  const query = `SELECT * FROM transactions WHERE id = $1 AND user_id = $2`;
  const result = await pool.query(query, [id, user_id]);
  return result.rows[0];
};

const updateTransaction = async (id, updatedData, user_id) => {
  if (Object.keys(updatedData).length === 0) {
    throw new Error("No fields provided to update");
  }

  const setClauses = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(updatedData)) {
    setClauses.push(`${key} = $${index}`);
    values.push(value);
    index++;
  }

  values.push(id, user_id);
  const query = `
    UPDATE transactions
    SET ${setClauses.join(", ")}
    WHERE id = $${index} AND user_id = $${index + 1}
    RETURNING *;
  `;
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in updateTransaction query:", error);
    throw error;
  }
};

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
