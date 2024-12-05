const express = require("express");
const morgan = require("morgan");
const mainRoutes = require("./routes/index");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const cors = require("cors"); // import cors package

// Load environment variables
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

// Cấu hình CORS
app.use(cors({
  origin: '*', // Cho phép tất cả các domain
  methods: 'GET,POST',  // Các phương thức được phép
  allowedHeaders: 'Content-Type, Authorization'  // Các header được phép
}));

// Routes
app.use("/", mainRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
