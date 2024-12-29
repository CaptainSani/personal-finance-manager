const express = require('express');
const router = express.Router();
const BudgetController = require('../controller/budgetController');
const { authenticate } = require('../midddleware/auth');

// Create a new budget
router.post('/budgets/create', authenticate, BudgetController.createBudget);

// Get all budgets
router.get('/budgets', authenticate, BudgetController.getAllBudgets);

// Get a budget by ID
router.get('/budgets/:id', authenticate, BudgetController.getBudgetById);

// Update a budget
router.patch('/budgets/:id', authenticate, BudgetController.updateBudget);

// Delete a budget
router.delete('/budgets/:id', authenticate, BudgetController.deleteBudget);

module.exports = router;