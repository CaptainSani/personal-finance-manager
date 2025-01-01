const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const insightRoutes = require("./routes/insightRoutes");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;



app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api", budgetRoutes);

app.use("/api", transactionRoutes);

app.use("/api", insightRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
