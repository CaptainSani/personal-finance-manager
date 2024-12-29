const express = require('express');
const router = express.Router();
const insightsController = require('../controller/insightController');
const { authenticate } = require('../middleware/auth');


// Financial insights endpoints
router.get("/insights/summary", authenticate, insightsController.generateSummary);
router.get("/insights/monthly", authenticate, insightsController.generateMonthlyBreakdown);

module.exports = router;