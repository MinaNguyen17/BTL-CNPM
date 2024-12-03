const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
  contentType: { type: String, required: true }, // Loại file (image/png, application/pdf, ...)
  data: { type: Buffer, required: true }, // Nội dung file
});

module.exports = mongoose.model("File", fileSchema);
