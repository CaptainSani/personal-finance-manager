const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const cors = require("cors");
const dotenv = require("dotenv");

const port = 3000;

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api", budgetRoutes);

app.use("/api", transactionRoutes);

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
