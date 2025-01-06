const Insights = require("../models/insights");

const insightsController = {
  async generateSummary(req, res) {
    try {
      const { id: userId } = req.user;

      const summary = await Insights.generateSummary(userId);

      res.status(200).json({
        status: "Success",
        statusCode: 200,
        data: summary,
      });
    } catch (error) {
      console.error("Error Generating Insight Summary:", error);
      res.status(500).json({
        status: "Internal Server Error",
        statusCode: 500,
        message: `Failed To Generate Financial Insight Summary: ${error.message}`,
      });
    }
  },
};

module.exports = insightsController;
