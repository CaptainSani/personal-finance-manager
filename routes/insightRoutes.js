const express = require('express');
const router = express.Router();
const insightsController = require('../controller/insightController');
const { authenticate } = require('../middleware/auth');

router.get("/insights/summary", authenticate, insightsController.generateSummary);

module.exports = router;