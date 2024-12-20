const Budget = require('../models/budget');


const budgetController = {
  async createBudget(req, res) {
    try {
      const { title, totalAmount, duration } = req.body;
  
      if (!title || !totalAmount || !duration) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }
  
      const budget = await Budget.create(title, totalAmount, duration, req.user.id);
      res.json(budget);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async getAllBudgets(req, res) {
    try {
      const budgets = await Budget.getAll(req.user.userId);
      res.json(budgets);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async getBudgetById(req, res) {
    try {
      const budget = await Budget.getById(req.params.id, req.user.userId);
      if (!budget) {
        res.status(404).json({ message: 'Budget not found' });
      } else {
        res.json(budget);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async updateBudget(req, res) {
    try {
      const budget = await Budget.update(req.params.id, req.body.title, req.body.totalAmount, req.body.duration, req.user.userId);
      if (!budget) {
        res.status(404).json({ message: 'Budget not found' });
      } else {
        res.json(budget);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async deleteBudget(req, res) {
    try {
      const budget = await Budget.deleteById(req.params.id, req.user.userId);
      if (!budget) {
        res.status(404).json({ message: 'Budget not found' });
      } else {
        res.json({ message: 'Budget deleted successfully' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = budgetController;