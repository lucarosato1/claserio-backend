const express = require ("express");
const router = express.Router();
const recoveryController = require("../controller/recoveryController");


// Send recovery email
router.post("/recovery", recoveryController.sendRecoveryEmail);

// Update password
router.put("/recovery", recoveryController.validateRecoveryCode);

module.exports = router;