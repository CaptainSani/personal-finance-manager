const transactionModel = require("../models/transactions");
const { autoCategorize } = require("../utils/autoCategorization");


// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { amount, narration, budget_id } = req.body;
    const user_id = req.user.id;

    if (!narration) {
      return res.status(400).json({
        status: "Bad Request",
        statusCode: "400",
        error: "Narration is required to create a transaction",
      });
    }

    const category = autoCategorize(narration);

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      return res.status(400).json({
        status: "Bad Request",
        statusCode: "400",
        error: "Invalid Amount: Must Be A Number",
      });
    }

    const transaction = await transactionModel.createTransaction({
      amount: numericAmount,
      narration,
      category,
      budget_id,
      user_id,
    });
    res.status(201).json({
      status: "Success OK",
      statusCode: "201",
      transaction,
    });
  } catch (error) {
    console.error("Error in createTransaction:", error);
    res.status(500).json({
      status: "Internal Server Error",
      statusCode: "500",
      message: `Error Creating Transaction: ${error.message}`,
    });
  }
};

// Get all transactions with optional filters
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
      statusCode: "200",
      transactions,
    });
  } catch (error) {
    console.error("Error in getAllTransactions:", error);
    res.status(500).json({
      status: "Internal Server Error",
      statusCode: "500",
      message: `Error fetching transactions", ${error.message}`,
    });
  }
};

// Get a transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const transaction = await transactionModel.getTransactionById(id, user_id);
    if (!transaction) {
      return res.status(404).json({
        status: "Not Found",
        statusCode: "404",
        message: `Transaction With Id ${id} Not Found`,
      });
    }
    res.status(200).json({
      status: "Success OK",
      statusCode: "200",
      transaction,
    });
  } catch (error) {
    console.error("Error in getTransactionById:", error);
    res.status(500).json({
      status: "Internal Server Error",
      statusCode: "500",
      message: `Error Fetching Transaction With ID", ${error.message}`,
    });
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const { amount, narration, budget_id } = req.body;

    if (amount !== undefined) {
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) {
        return res.status(400).json({
          status: "Bad Request",
          statusCode: "400",
          error: "Invalid Amount: Must Be A Number",
        });
      }
    }

    const updatedData = {
      amount,
      narration,
      budget_id,
    };

    if (narration) {
      updatedData.category = autoCategorize(narration);
    }

    const transaction = await transactionModel.updateTransaction(
      id,
      user_id,
      updatedData
    );
    
    if (!transaction) {
      return res.status(404).json({
        status: "Not Found",
        statusCode: "404",
        message: `Tranaction With Id ${id} Not Found`,
      });
    }
    res.status(200).json({
      status: "Success OK",
      statusCode: "200",
      message: `Tranaction With Id ${id} Updated Successfully`,
      transaction,
    });
  } catch (error) {
    console.error("Error in updateTransaction:", error);
    res.status(500).json({
      status: "Internal Server Error",
      statusCode: "500",
      message: `Error Updating Transaction", ${error.message}`,
    });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const transaction = await transactionModel.deleteTransaction(id, user_id);
    if (!transaction) {
      return res.status(404).json({
        satus: "Bad Request",
        statusCode: "400",
        error: `Transaction with ID ${id} Not Found`,
      });
    }
    res.status(200).json({
      status: "Success OK",
      tatusCode: "200",
      message: `Transaction With ID ${id} deleted successfully`,
    });
  } catch (err) {
    console.error("Error in deleteTransaction:", error);
    res.status(500).json({
      status: "Internal Server Error",
      statusCode: "500",
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
