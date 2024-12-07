const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mainRoutes = require("./routes/index");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const cors = require("cors"); // import cors package

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

//print
app.get("/print/uploadFile", (req, res) => {
  res.sendFile(path.join(__dirname, "../fronEnd/print/uploadFile.html"));
});

app.get("/homePage/config", (req, res) => {
  res.sendFile(path.join(__dirname, "../fronEnd/print/config.html"));
});

//history
app.get("/history/history", (req, res) => {
  res.sendFile(path.join(__dirname, "../fronEnd/history/history.html"));
});

//printerList
app.get("/printerList/printerList", (req, res) => {
  res.sendFile(path.join(__dirname, "../fronEnd/printerList/printerList.html"));
});

//successPrinting
app.get("/successPrinting/successPrinting", (req, res) => {
  res.sendFile(path.join(__dirname, "../fronEnd/successPrinting/successPrinting.html"));
});


// Cấu hình CORS
app.use(cors({
  origin: '*', // Cho phép tất cả các domain
  methods: 'GET,POST,DELETE',  // Các phương thức được phép
  allowedHeaders: 'Content-Type, Authorization'  // Các header được phép
}));

// Routes
app.use("/", mainRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
