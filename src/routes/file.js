const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const fileController = require("../controller/fileController");
const {
  upload,
  uploadErrorHandler,
} = require("../middleware/uploadMiddleware");

const router = express.Router();

// Routes chi tiết
router.get("/", fileController.getFiles); // Lấy danh sách file
router.post("/upload", upload.single("file"), fileController.uploadFile); // Upload file
router.get("/:id", fileController.getFileById); // Download file theo ID

router.use(uploadErrorHandler);

module.exports = router;
