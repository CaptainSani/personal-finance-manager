const pool = require("../config/database");

const Insights = {
    async generateSummary(userId) {
      // Query for total income and expenses

      const incomeExpenseQuery = {
        text: `
          SELECT
            SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS total_income,
            SUM(CASE WHEN amount < 0 THEN ABS(amount) ELSE 0 END) AS total_expenses
          FROM transactions
          WHERE user_id = $1
        `,
        values: [userId],
      };
      const incomeExpenseResult = await pool.query(incomeExpenseQuery);
  
      // Calculate the remaining budget 
      const remainingBudget = incomeExpenseResult.rows[0].total_income - incomeExpenseResult.rows[0].total_expenses;

      // Query for top spending categories
      const topCategoriesQuery = {
        text: `
          SELECT category, SUM(ABS(amount)) AS total_spent
          FROM transactions
          WHERE amount < 0 AND user_id = $1
          GROUP BY category
          ORDER BY total_spent DESC
          LIMIT 5
        `,
        values: [userId],
      };
      const topCategoriesResult = await pool.query(topCategoriesQuery);

      return {
        Total_Income: incomeExpenseResult.rows[0].total_income || 0,
        Total_Expenses: incomeExpenseResult.rows[0].total_expenses || 0,
        Remaining_Budget: remainingBudget || 0,
        Top_Spending_Categories: topCategoriesResult.rows || [],
      };
    },
  
    async generateMonthlyBreakdown(userId) {
      const query = {
        text: `
          SELECT
            TO_CHAR(created_at, 'YYYY-MM') AS Month,
            SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS Total_Income,
            SUM(CASE WHEN amount < 0 THEN ABS(amount) ELSE 0 END) AS Total_Expenses
          FROM transactions
          WHERE user_id = $1
          GROUP BY Month
          ORDER BY Month ASC
        `,
        values: [userId],
      };
  
      const result = await pool.query(query);
      return result.rows;
    },
  };
  
  module.exports = Insights;