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
router.post("/upload", upload.single("file"), fileController.uploadFile); // Upload file
router.delete("/:fileId", fileController.deleteFileById);
router.post("/:fileId/config", fileController.addFileConfig);
router.get("/:fileId/config", fileController.getFileWithConfig);
router.get("/:id", fileController.getFileById); // Download file theo ID
router.get("/", fileController.getFiles); // Lấy danh sách file

router.use(uploadErrorHandler);

module.exports = router;
