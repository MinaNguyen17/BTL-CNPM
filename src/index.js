const express = require("express");
const morgan = require("morgan");
const mainRoutes = require("./routes/index");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/", mainRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
