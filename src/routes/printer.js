const express = require("express");
const printerController = require("../controller/printerController");

const router = express.Router();

router.get("/log", printerController.getAllLogs);
router.post("/send", printerController.SendRequest);
// Route để xem thông tin một máy in cụ thể
router.get("/:printerID", printerController.GetOnePrinter);

// Route để cập nhật thông tin một máy in
router.put("/:printerID", printerController.UpdatePrinter);
// Route để xóa máy in
router.delete("/:printerID", printerController.DeletePrinter);
router.post("/", printerController.addNewPrinter);

// Route để xem toàn bộ máy in
router.get("/", printerController.GetAllPrinter);

module.exports = router;
