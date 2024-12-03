const mongoose = require("mongoose");

const printerSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      require: true,
    },
    model: {
      type: String,
    },
    description: {
      type: String,
    },
    campus: {
      type: String,
      enum: ["CS1", "CS2"],
      require: true,
    },
    building: {
      type: String,
      require: true,
    },
    room: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: ["Active", "Disabled"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Printer", printerSchema);
