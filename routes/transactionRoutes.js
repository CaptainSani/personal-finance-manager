const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');
const { authenticate } = require('../middleware/auth');

router.post('/transactions/create', authenticate, transactionController.createTransaction);
router.get('/transactions', authenticate, transactionController.getAllTransactions);
router.get('/transactions/:id', authenticate, transactionController.getTransactionById);
router.patch('/transactions/:id', authenticate, transactionController.updateTransaction);
router.delete('/transactions/:id', authenticate, transactionController.deleteTransaction);

module.exports = router;
