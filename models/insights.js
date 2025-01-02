const pool = require("../config/database");

const Insights = {
  async generateSummary(userId) {
    const incomeExpenseBudgetQuery = {
      text: `
        WITH income_expenses AS (
          SELECT
            SUM(CASE WHEN transaction_type = 'income' THEN amount ELSE 0 END) AS total_income,
            SUM(CASE WHEN transaction_type = 'expenses' THEN amount ELSE 0 END) AS total_expenses
          FROM transactions
          WHERE user_id = $1
        ),
        total_budgets AS (
          SELECT
            SUM(total_amount) AS total_budget
          FROM budgets
          WHERE user_id = $1
        ),
        total_transactions_expenses AS (
          SELECT 
            SUM(CASE WHEN transaction_type = 'expenses' THEN amount ELSE 0 END) AS total_transactions_expenses
          FROM transactions
          WHERE user_id = $1
        ),
        top_categories AS (
          SELECT 
            category,
            SUM(amount) AS total_spent
          FROM transactions
          WHERE transaction_type = 'expenses' AND user_id = $1
          GROUP BY category
          ORDER BY total_spent DESC
          LIMIT 5
        )
        SELECT
          ie.total_income,
          tb.total_budget,
          ie.total_expenses,
          (ie.total_income - ie.total_expenses) AS balance,
          (tb.total_budget - COALESCE(te.total_transactions_expenses, 0)) AS remaining_budget,
          (ie.total_expenses - COALESCE(te.total_transactions_expenses, 0)) AS remaining_expenses_income
        FROM income_expenses ie
        CROSS JOIN total_budgets tb
        CROSS JOIN total_transactions_expenses te;
      `,
      values: [userId],
    };

    try {
      const summaryResult = await pool.query(incomeExpenseBudgetQuery);

      const topSpendingCategoriesQuery = {
        text: `
          SELECT 
            category, 
            SUM(amount) AS total_spent
          FROM transactions
          WHERE transaction_type = 'expenses' AND user_id = $1
          GROUP BY category
          ORDER BY total_spent DESC
          LIMIT 4
        `,
        values: [userId],
      };
      const topSpendingCategoriesResult = await pool.query(topSpendingCategoriesQuery);

      const topSpendingCategories = topSpendingCategoriesResult.rows.map((row) => ({
        Category: row.category,
        Total_Spent: row.total_spent,
      }));

      const summary = {
        Total_Income: (summaryResult.rows[0] ? summaryResult.rows[0].total_income : 0),
        Total_Budget: (summaryResult.rows[0] ? summaryResult.rows[0].total_budget : 0),
        Total_Expenses: (summaryResult.rows[0] ? summaryResult.rows[0].total_expenses : 0),
        Balance: (summaryResult.rows[0] ? summaryResult.rows[0].balance : 0),
        Remaining_Budget: (summaryResult.rows[0] ? summaryResult.rows[0].remaining_budget : 0),
        Remaining_Expenses: (summaryResult.rows[0] ? summaryResult.rows[0].remaining_expenses_income : 0),
        Top_Spending_Categories: topSpendingCategories,
      };

      return {
        summary,
      };
    } catch (err) {
      console.error("Error generating financial summary:", err);
      throw err;
    }
  },
  
    async generateMonthlyBreakdown(userId) {
      const query = {
        text: `
          SELECT
          TO_CHAR(created_at, 'YYYY-MM') AS Month,
          SUM(CASE WHEN transaction_type = 'income' THEN amount ELSE 0 END) AS Total_Income,
          SUM(CASE WHEN transaction_type = 'expenses' THEN amount ELSE 0 END) AS Total_Expenses
        FROM transactions
        WHERE user_id = $1
        GROUP BY Month
        ORDER BY Month ASC
        `,
        values: [userId],
      };
  
      try {
        const result = await pool.query(query);

        const formattedResult = result.rows.map((row) => ({
          Month: row.month,
          Total_Spent: row.total_expenses,
        }));
    
        return formattedResult;
      } catch (err) {
        console.error("Error generating monthly breakdown:", err);
        throw err;
      }
    }
  };

  module.exports = Insights;