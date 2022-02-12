var express = require("express");
const CampaignController = require("../controllers/CampaignsController");

var router = express.Router();

router.get("/", CampaignController.findAll);
router.post("/", CampaignController.create);
module.exports = router;