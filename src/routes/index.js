const express = require("express");
const fileRoute = require("./file");

const router = express.Router();

// Route chính dẫn đến fileRoute
router.use("/file", fileRoute);

module.exports = router;
