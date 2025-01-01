const pool = require("../config/database");

const Insights = {
  async generateSummary(userId) {
    // Query to calculate income, expenses, remaining budgets, and top spending categories
    const incomeExpenseBudgetQuery = {
      text: `
        WITH income_expenses AS (
          SELECT
            SUM(CASE WHEN transaction_type = 'income' THEN amount ELSE 0 END) AS total_income,
            SUM(CASE WHEN transaction_type = 'expenses' THEN amount ELSE 0 END) AS total_expenses
          FROM transactions
          WHERE user_id = $1
        ),
        remaining_budgets AS (
          SELECT 
            b.id AS budget_id,
            b.title,
            b.total_amount,
            COALESCE(
              b.total_amount - SUM(
                CASE WHEN t.transaction_type = 'expenses' THEN ABS(t.amount) ELSE 0 END
              ), 
              b.total_amount
            ) AS remaining_amount
          FROM budgets b
          LEFT JOIN transactions t ON t.budget_id = b.id
          WHERE b.user_id = $1
          GROUP BY b.id, b.title, b.total_amount
        ),
        top_categories AS (
          SELECT 
            category, 
            SUM(ABS(amount)) AS total_spent
          FROM transactions
          WHERE transaction_type = 'expenses' AND user_id = $1
          GROUP BY category
          ORDER BY total_spent DESC
          LIMIT 4
        )
        SELECT 
          i.total_income,
          i.total_expenses,
          rb.budget_id,
          rb.title AS budget_title,
          rb.remaining_amount AS remaining_budget,
          tc.category AS top_category,
          tc.total_spent AS category_total_spent
        FROM income_expenses i
        CROSS JOIN remaining_budgets rb
        LEFT JOIN top_categories tc ON TRUE
      `,
      values: [userId],
    };

    try {
      const result = await pool.query(incomeExpenseBudgetQuery);

      // Prepare the response format
      const budgets = result.rows.reduce((acc, row) => {
        if (!acc.find((b) => b.Title === row.budget_title)) {
          acc.push({
            Title: row.budget_title,
            Remaining_Budget_Amount: Math.abs(row.remaining_budget),
          });
        }
        return acc;
      }, []);

      const topSpendingCategories = result.rows
        .filter((row) => row.top_category)
        .reduce((acc, row) => {
          if (!acc.find((c) => c.Category === row.top_category)) {
            acc.push({
              Category: row.top_category,
              Total_Spent: row.category_total_spent,
            });
          }
          return acc;
        }, []);

      const summary = {
        Total_Income: (result.rows[0] ? result.rows[0].total_income : 0),
        Total_Expenses: (result.rows[0] ? result.rows[0].total_expenses : 0),
        Budgets: budgets,
        Top_Spending_Categories: topSpendingCategories,
      };

      return summary;
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
  
      const result = await pool.query(query);
      return result.rows;
    },
  };
  
  module.exports = Insights;