const express = require ("express");
const router = express.Router();
const recoveryController = require("../controller/passwordRecoveryController");

//create recovery
router.post('/recoveries', recoveryController.sendVerificationCode);

module.exports = router;