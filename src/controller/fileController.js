const File = require("../model/File.js");
const FileConfig = require("../model/FileConfig.js");
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

// Thêm cấu hình cho file
exports.addFileConfig = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { copies, scale, sides, layout, paperSize, printRange, totalPages } =
      req.body;

    // Kiểm tra file có tồn tại hay không
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "File không tồn tại." });
    }

    // Kiểm tra nếu file đã có cấu hình
    const existingConfig = await FileConfig.findOne({ file: fileId });
    if (existingConfig) {
      return res.status(400).json({ message: "File đã có cấu hình." });
    }

    // Tạo config mới
    const newConfig = new FileConfig({
      file: fileId,
      copies,
      scale,
      sides,
      layout,
      paperSize,
      printRange,
      totalPages,
    });

    await newConfig.save();
    file.fileConfig = newConfig._id;
    await file.save();
    res.status(201).json(newConfig);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy thông tin File kèm theo FileConfig
exports.getFileWithConfig = async (req, res) => {
  try {
    const { fileId } = req.params;

    // Lấy file kèm cấu hình (dùng populate)
    const fileWithConfig = await File.findById(fileId).populate("fileConfig");

    if (!fileWithConfig) {
      return res.status(404).json({ message: "File không tồn tại." });
    }

    res.status(200).json(fileWithConfig);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFileById = async (req, res) => {
  const { fileId } = req.params; // Lấy ID từ request params
  try {
    // Tìm file trong MongoDB
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found!" });
    }

    // Xóa file
    await file.deleteOne();

    return res.status(200).json({ message: "File deleted successfully!" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the file." });
  }
};
