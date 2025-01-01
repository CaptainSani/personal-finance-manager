const transactionModel = require("../models/transactions");
const budgetModel = require("../models/budgets");

const { autoCategorize } = require("../utils/autoCategorization");


// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { amount, narration, transaction_type, budget_id } = req.body;
    const user_id = req.user.id;

    if (!narration) {
      return res.status(400).json({
        status: "Bad Request",
        statusCode: 400,
        error: "Please Input Narration To Create A Transaction",
      });
    }

    if (budget_id !== undefined) {
      if (!Number.isInteger(Number(budget_id))) {
        return res.status(400).json({
          status: "Bad Request",
          statusCode: 400,
          error: "Invalid Budget_Id Type: Must Be An Integer Number",
        });
      }

      const budgetExists = await budgetModel.findById(budget_id);
      if (!budgetExists) {
        return res.status(400).json({
          status: "Bad Request",
          statusCode: 400,
          error: "Invalid Budget_Id: Please Input A Valid Budget_Id",
        });
      }
    }

    const category = autoCategorize(narration);

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      return res.status(400).json({
        status: "Bad Request",
        statusCode: 400,
        error: "Invalid Amount: Must Be A Number",
      });
    }

    const transaction = await transactionModel.createTransaction({
      amount: numericAmount,
      narration,
      category,
      transaction_type,
      budget_id,
      user_id,
    });
    res.status(200).json({
      status: "Success OK",
      statusCode: 200,
      message: "Transaction Created Succesfully",
      transaction,
    });
  } catch (error) {
    console.error("Error in createTransaction:", error);
    res.status(500).json({
      status: "Internal Server Error",
      statusCode: 500,
      message: `Error Creating Transaction: ${error.message}`,
    });
  }
};


const getAllTransactions = async (req, res) => {
  try {
    const user_id = req.user.id;
    const filters = req.query;
    const transactions = await transactionModel.getAllTransactions(
      user_id,
      filters
    );
    res.status(200).json({
      status: "Success OK",
      statusCode: 200,
      transactions,
    });
  } catch (error) {
    console.error("Error in getAllTransactions:", error);
    res.status(500).json({
      status: "Internal Server Error",
      statusCode: 500,
      message: `Error Fetching Transactions", ${error.message}`,
    });
  }
};


const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const transaction = await transactionModel.getTransactionById(id, user_id);
    if (!transaction) {
      return res.status(404).json({
        status: "Not Found",
        statusCode: 404,
        message: `Transaction Not Found`,
      });
    }
    res.status(200).json({
      status: "Success OK",
      statusCode: 200,
      transaction,
    });
  } catch (error) {
    console.error("Error in getTransactionById:", error);
    res.status(500).json({
      status: "Internal Server Error",
      statusCode: 500,
      message: `Error Fetching Transaction With ID", ${error.message}`,
    });
  }
};


const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const { amount, narration, transaction_type, budget_id } = req.body;

    const updatedData = { };

    if (amount !== undefined) {
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) {
        return res.status(400).json({
          status: "Bad Request",
          statusCode: 400,
          error: "Invalid Amount: Must be a number",
        });
      }
      updatedData.amount = numericAmount;
    }

    if (narration) {
      updatedData.narration = narration;
      updatedData.category = autoCategorize(narration);
    }

    if (transaction_type) {
      updatedData.transaction_type = transaction_type;
    }
      
    if (budget_id !== undefined) {
      if (!Number.isInteger(Number(budget_id))) {
        return res.status(400).json({
          status: "Bad Request",
          statusCode: 400,
          error: "Invalid Budget_Id Type: Must Be An Integer Number",
        });
      }

      const budgetExists = await budgetModel.findById(budget_id);
      if (!budgetExists) {
        return res.status(400).json({
          status: "Bad Request",
          statusCode: 400,
          error: "Invalid Budget_Id: Please Input A Valid Budget_Id",
        });
      }
      updatedData.budget_id = budget_id;
    }

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({
        status: "Bad Request",
        statusCode: 400,
        error: "No Fields Provided To Update",
      });
    }
  
    const transaction = await transactionModel.updateTransaction(
      id,
      updatedData,
      user_id
    );

    if (!transaction) {
      return res.status(404).json({
        status: "Not Found",
        statusCode: 404,
        message: `Transaction Not Found`,
      });
    }

    res.status(200).json({
      status: "Success OK",
      statusCode: 200,
      message: `Transaction Updated Successfully`,
      transaction,
    });
  } catch (error) {
    console.error("Error in updateTransaction:", error);
    res.status(500).json({
      status: "Internal Server Error",
      statusCode: 500,
      message: `Error Updating Transaction: ${error.message}`,
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const transaction = await transactionModel.deleteTransaction(id, user_id);
    if (!transaction) {
      return res.status(404).json({
        satus: "Bad Request",
        statusCode: 400,
        error: `Transaction Not Found`,
      });
    }
    res.status(200).json({
      status: "Success OK",
      statusCode: 200,
      message: `Transaction Deleted Successfully`,
    });
  } catch (err) {
    console.error("Error in deleteTransaction:", error);
    res.status(500).json({
      status: "Internal Server Error",
      statusCode: 500,
      message: `Error Deleting Transaction: ${err.message}`,
    });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
