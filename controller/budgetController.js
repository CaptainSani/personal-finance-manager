const Budget = require('../models/budget');


const budgetController = {
  async createBudget(req, res) {
    try {
      const { title, total_amount, duration } = req.body;
  
      if (!title || !total_amount || !duration) {
        return res.status(400).json({ 
          status: "Bad Request",
          statusCode: 400,
          error: 'Please provide all required fields' });
      }

      const numerictotal_amount = parseFloat(total_amount);
    if (isNaN(numerictotal_amount)) {
      return res.status(400).json({ 
        status: "Bad Request",
        statusCode: 400,
        error: 'Invalid total_amount: Must Be A Number' });
    }
  
      const budget = await Budget.create(title, numerictotal_amount, duration, req.user.id);

      res.status(200).json({
        status: "Success OK",
        statusCode: 200,
        message: "Budget Created Succesfully",
        budget});
    } catch (err) {
      console.error("Error in createBudget:", err);
    res.status(500).json({
      status: "Internal Server Error",
      statusCode: 500, 
      message: `Error Creating Budget: ${err.message}` });
    }
  },

  async getAllBudgets(req, res) {
    try {
      const budgets = await Budget.getAll(req.user.id);
      res.status(200).json({
        status: "Success OK",
        statusCode: 200,
        budgets});
    } catch (err) {
      console.error("Error in getAllBudgets:", err); // Add specific error context
    res.status(500).json({
      status: "Internal Server Error",
      statusCode: 500,
      message: `Error Getting All Budgets: ${err.message}` });
    }
  },

  async getBudgetById(req, res) {
    try {
      const budget = await Budget.getById(req.params.id, req.user.id);
      if (!budget) {
        res.status(404).json({ 
          status: "Not Found",
          statusCode: 404,
          message: `Budget With Id ${req.params.id} Not Found` });
      } else {
        res.status(200).json({
          status: "Success OK",
          statusCode: 200,
          budget});
      }
    } catch (err) {
      console.error("Error in getBudgetById:", err);
      res.status(500).json({
        status: "Internal Server Error",
        statusCode: 500,
        message: `Error Getting Budget With ID: ${err.message}` });
    }
  },

  async updateBudget(req, res) {
    try {
      const { title, total_amount, duration } = req.body;
    
      if (!title || !total_amount || !duration) {
        return res.status(400).json({ 
          status: "Bad Request",
          statusCode: 400,
          error: "Please Input All Required Fields" });
      }
  
      const numerictotal_amount = parseFloat(total_amount);
      if (isNaN(numerictotal_amount)) {
        return res.status(400).json({ 
          status: "Bad Request",
          statusCode: 400,
          error: "Invalid total_amount: Must Be A Number" });
      }

      const budget = await Budget.update(req.params.id, title, numerictotal_amount, duration, req.user.id);
      
      if (!budget) {
        res.status(404).json({ 
          status: "Not Found",
            statusCode: 404,
          message: `Budget With Id ${req.params.id} not found` });
      } else {
        res.status(200).json({
          status: "Success OK",
          statusCode: 200,
          message: `Budget With Id ${req.params.id} Updated Succesfully`,
          budget});
      }
    } catch (err) {
      console.error("Error in updateBudget:", err);
      res.status(500).json({ 
      status: "Internal Server Error",
      statusCode: 500,
      message: `Error Updating Budget: ${err.message}` });
    }
  },

  async deleteBudget(req, res) {
    try {
      const budget = await Budget.deleteById(req.params.id, req.user.id);

      if (!budget) {
        res.status(404).json({ 
          status: "Bad Request",
          statusCode: 404,
          error: `Budget With Id ${req.params.id} Not found` });
      } else {
        res.status(200).json({ 
          status: "Success OK",
          statusCode: 200,
          message: `Budget With Id ${req.params.id} deleted successfully` });
      }
    } catch (err) {
      console.error("Error in deleteBudget:", err);
      res.status(500).json({ 
      status: "Internal Server Error",
      statusCode: 500,
      message: `Error Deleting Budget: ${err.message}` });
    }
  }
}

module.exports = budgetController;