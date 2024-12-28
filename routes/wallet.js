const express = require('express');
const { depositFunds, withdrawFunds, transferFunds } = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');  // Middleware for verifying JWT

const router = express.Router();

// Deposit Funds
router.post('/deposit', authMiddleware, depositFunds);

// Withdraw Funds
router.post('/withdraw', authMiddleware, withdrawFunds);

// Transfer Funds
router.post('/transfer', authMiddleware, transferFunds);

module.exports = router;
