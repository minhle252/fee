const express = require("express");
const router = express.Router();
const homeController = require("../../app/controllers/frontEnd/homeController");

router.all("/", homeController.hompePage);
router.all("/send-mail", homeController.sendMail);

module.exports = router;
