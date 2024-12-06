const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mainRoutes = require("./routes/index");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use("/static", express.static(path.join(__dirname, "../fronEnd/static")));

app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/", mainRoutes);
// Route để render file HTML từ thư mục frontend

app.get("/login/index", (req, res) => {
  res.sendFile(path.join(__dirname, "../fronEnd/login/index.html"));
});

app.get("/login/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../fronEnd/login/login.html"));
});

app.get("/homePage/home2", (req, res) => {
  res.sendFile(path.join(__dirname, "../fronEnd/homePage/home2.html"));
});

//trang chủ
app.get("/homePage/index", (req, res) => {
  res.sendFile(path.join(__dirname, "../fronEnd/homePage/index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../fronEnd/homePage/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
