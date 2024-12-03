const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Cấu hình lưu trữ tệp
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");

    // Kiểm tra nếu thư mục chưa tồn tại thì tạo mới
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Kiểm tra loại tệp upload
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "text/plain",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Cho phép tải lên nếu đúng loại tệp
  } else {
    cb(
      new Error("Invalid file type. Only JPG, PNG, TXT, and PDF are allowed!"),
      false
    );
  }
};

// Cấu hình Multer với cả fileFilter và giới hạn kích thước tệp
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn kích thước tệp 10MB
});

// Middleware xử lý lỗi đẹp hơn
const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({
          success: false,
          message: "File is too large. Maximum size is 10MB.",
        });
      default:
        return res.status(400).json({
          success: false,
          message: "An error occurred while uploading the file.",
        });
    }
  }

  // Kiểm tra lỗi từ fileFilter
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Nếu không có lỗi, tiếp tục vào middleware tiếp theo
  next();
};

module.exports = { upload, uploadErrorHandler };
