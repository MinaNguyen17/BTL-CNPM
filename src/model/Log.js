const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  printerName: { type: String, require: true },
});

module.exports = mongoose.model("Log", logSchema);
