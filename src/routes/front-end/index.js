const express = require("express");
const router = express.Router();
const homeController = require("../../app/controllers/frontEnd/homeController");

router.all("/", homeController.hompePage);

module.exports = router;
