const express = require("express");
const printerController = require("../controller/printerController");

const router = express.Router();

router.post("/", printerController.addNewPrinter);

// Route để xem toàn bộ máy in
router.get("/", printerController.GetAllPrinter);

// Route để xem thông tin một máy in cụ thể
router.get("/:printerID", printerController.GetOnePrinter);

// Route để cập nhật thông tin một máy in
router.put("/:printerID", printerController.UpdatePrinter);

// Route để xóa máy in
router.delete("/:printerID", printerController.DeletePrinter);

module.exports = router;
