const db = require("../config/database");

class Budget {
 static async create(title, totalAmount, duration, userId) {

    if (typeof title !== 'string' || typeof totalAmount !== 'number' || typeof duration !== 'string' ||
      typeof userId !== 'number') {
      throw new Error('Invalid Input Types');
    }
    const query = {
      text: `INSERT INTO budgets (title, total_amount, duration, user_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [title, totalAmount, duration,userId],
    };
    try {
      const result = await db.query(query);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getAll(userId) {
    const query = {
      text: `SELECT * FROM budgets WHERE user_id = $1`,
      values: [userId],
    };
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getById(id, userId) {
    const query = {
      text: `SELECT * FROM budgets WHERE id = $1 AND user_id = $2`,
      values: [id, userId],
    };
    try {
      const result = await db.query(query);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async update(id, title, total_amount, duration, userId) {
    const query = {
      text: `UPDATE budgets SET title = $1, total_amount = $2, duration = $3 WHERE id = $4 AND user_id = $5 RETURNING *`,
      values: [title, total_amount, duration, id, userId],
    };
    try {
      const result = await db.query(query);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async deleteById(id, userId) {
    const query = {
      text: `DELETE FROM budgets WHERE id = $1 AND user_id = $2 RETURNING *`,
      values: [id, userId],
    };
    try {
      const result = await db.query(query);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async findById(id) {
  const query = {
    text: `SELECT * FROM budgets WHERE id = $1`,
    values: [id],
  };
  try {
    const result = await db.query(query);
    return result.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
  }
}

module.exports = Budget;