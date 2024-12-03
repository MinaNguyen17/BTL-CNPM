const File = require("../model/File.js");
const fs = require("fs").promises;

// Lấy danh sách file
exports.getFiles = async (req, res) => {
  try {
    const files = await File.find({}, "filename size uploadedAt contentType");
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving files", error });
  }
};

// Lấy thông tin file theo ID
exports.getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id); // Tìm file theo ID
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving file", error });
  }
};

// Upload file mới
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileData = await fs.readFile(req.file.path); // Đọc nội dung file từ ổ đĩa

    const newFile = new File({
      filename: req.file.originalname,
      size: req.file.size,
      contentType: req.file.mimetype,
      data: fileData,
    });

    const savedFile = await newFile.save();

    // Xóa file tạm khỏi ổ đĩa sau khi lưu
    await fs.unlink(req.file.path);

    // Trả về response có trường success
    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      file: savedFile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading file",
      error: error.message,
    });
  }
};
