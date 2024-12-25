const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');
const { authenticate } = require('../midddleware/auth');

router.post('/transactions', authenticate, transactionController.createTransaction);
router.get('/transactions', authenticate, transactionController.getAllTransactions);
router.get('/transactions/:id', authenticate, transactionController.getTransactionById);
router.put('/transactions/:id', authenticate, transactionController.updateTransaction);
router.delete('/transactions/:id', authenticate, transactionController.deleteTransaction);

module.exports = router;
