const express = require("express");
const fileRoute = require("./file");
const printerRoute = require("./printer.js");

const router = express.Router();

router.use("/file", fileRoute);
router.use("/printer", printerRoute);

module.exports = router;
