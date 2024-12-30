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
        statusCode: 400,
        error: "Please Input Narration To Create A Transaction",
      });
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
    const { amount, narration} = req.body;

    if (amount !== undefined) {
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) {
        return res.status(400).json({
          status: "Bad Request",
          statusCode: 400,
          error: "Invalid Amount: Must Be A Number",
        });
      }
    }

    const updatedData = {
      amount,
      narration,
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
      message: `Error Updating Transaction", ${error.message}`,
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
