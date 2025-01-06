const pool = require("../config/database");

const Insights = {
  async generateSummary(userId) {
    const incomeExpenseBudgetQuery = {
      text: `
        WITH income_expenses AS (
          SELECT
            SUM(CASE WHEN transaction_type = 'income' THEN amount ELSE 0 END) AS total_income,
            SUM(CASE WHEN transaction_type = 'expenses' THEN amount ELSE 0 END) AS total_expenses,
            SUM(amount) AS total_transactions
          FROM transactions
          WHERE user_id = $1
        ),
        total_budgets AS (
          SELECT
            SUM(total_amount) AS total_budget,
            AVG(total_amount) AS monthly_allocation
          FROM budgets
          WHERE user_id = $1
        ),
        used_budget AS (
          SELECT
            SUM(amount) AS used_budget
          FROM transactions
          WHERE transaction_type = 'expenses' AND budget_id IS NOT NULL AND user_id = $1
        )
        SELECT
          ie.total_income,
          ie.total_expenses,
          ie.total_transactions,
          tb.total_budget,
          tb.monthly_allocation,
          ub.used_budget,
          (ie.total_income - ie.total_expenses) AS balance,
           ABS(tb.total_budget - COALESCE(ub.used_budget, 0)) AS remaining_budget
        FROM income_expenses ie
        CROSS JOIN total_budgets tb
        CROSS JOIN used_budget ub;
      `,
      values: [userId],
    };  

    const lastTransactionsQuery = {
      text: `
        SELECT
          amount,
          transaction_type,
          category
        FROM transactions
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT 3
      `,
      values: [userId],
    };

    const lastBudgetsQuery = {
      text: `
        SELECT
          total_amount,
          title,
          duration
        FROM budgets
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT 3
      `,
      values: [userId],
    };

    try {
      const summaryResult = await pool.query(incomeExpenseBudgetQuery);
      const transactionsResult = await pool.query(lastTransactionsQuery);
    const budgetsResult = await pool.query(lastBudgetsQuery);

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
        Total_Expenses: (summaryResult.rows[0] ? summaryResult.rows[0].total_expenses : 0),
        Total_Transactions: (summaryResult.rows[0] ? summaryResult.rows[0].total_transactions : 0),
        Total_Budget: (summaryResult.rows[0] ? summaryResult.rows[0].total_budget : 0),
        Monthly_Allocation: (summaryResult.rows[0] ? summaryResult.rows[0].monthly_allocation : 0),
        Net_Balance: (summaryResult.rows[0] ? summaryResult.rows[0].balance : 0),
        Used_Budget: (summaryResult.rows[0] ? summaryResult.rows[0].used_budget : 0),
        Remaining_Budget: (summaryResult.rows[0] ? summaryResult.rows[0].remaining_budget : 0),
        Top_Spending_Categories: topSpendingCategories,
        Last_Transactions: transactionsResult.rows.map((row) => ({
          Amount: row.amount || 0,
          Transaction_Type: row.transaction_type,
          Category: row.category,
        })),
        Last_Budgets: budgetsResult.rows.map((row) => ({
          Total_Amount: row.total_amount || 0,
          Title: row.title,
          Duration: row.duration,
        })),
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
          Total_Income: row.total_income,
          Total_Expenses: row.total_expenses,
        }));
    
        return formattedResult;
      } catch (err) {
        console.error("Error generating monthly breakdown:", err);
        throw err;
      }
    }
  };

  module.exports = Insights;