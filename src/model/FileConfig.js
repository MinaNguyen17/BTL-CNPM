const mongoose = require("mongoose");

const fileConfigSchema = new mongoose.Schema({
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
    unique: true, // Một file chỉ có một config
  },
  copies: { type: Number, required: true }, // Số bản in
  scale: { type: String, required: true }, // Tỷ lệ (e.g., 100%)
  sides: { type: Number, required: true }, // Số mặt in
  layout: { type: String, enum: ["Portrait", "Landscape"], required: true }, // Bố cục
  paperSize: { type: String, enum: ["A3", "A4"], required: true }, // Cỡ giấy
  printRange: { type: String }, // Trang in (e.g., "1-5, 7")
  totalPages: { type: Number, required: true }, // Tổng số trang
});

module.exports = mongoose.model("FileConfig", fileConfigSchema);
