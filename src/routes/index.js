const express = require("express");
const fileRoute = require("./file");
const printerRoute = require("./printer.js");
const {
  createAccount,
  login,
  authenticate,
} = require("../controller/accountController");

const router = express.Router();

router.use("/file", authenticate, fileRoute);
router.use("/printer", authenticate, printerRoute);
router.post("/register", createAccount);
router.post("/login", login);

module.exports = router;
