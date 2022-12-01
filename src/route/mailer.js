const express = require ("express");
const mailController = require("../controller/mailController");
const router = express.Router();

//send email
router.post('/sendMail/:commentId/:reason', mailController.sendEmail);

module.exports = router;