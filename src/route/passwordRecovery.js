const express = require ("express");
const paswordRecController = require("../controller/passwordRecoveryController");
const router = express.Router();

//recovery password
router.post('/passwordRecovey/:id', paswordRecController.recoveryPassword);

module.exports = router;