const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");

const port = 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;