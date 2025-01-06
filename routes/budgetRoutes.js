const express = require("express");
const router = express.Router();
const BudgetController = require("../controller/budgetController");
const { authenticate } = require("../middleware/auth");

router.post("/budgets/create", authenticate, BudgetController.createBudget);

router.get("/budgets", authenticate, BudgetController.getAllBudgets);

router.get("/budgets/:id", authenticate, BudgetController.getBudgetById);

router.patch("/budgets/:id", authenticate, BudgetController.updateBudget);

router.delete("/budgets/:id", authenticate, BudgetController.deleteBudget);

module.exports = router;
