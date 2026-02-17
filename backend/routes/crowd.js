const express = require("express");
const router = express.Router();
const crowdController = require("../controllers/crowdController");

// GET /api/crowd -> summary for last 5 minutes
router.get("/", crowdController.getFiveMinutesAgo);

// GET /api/crowd/latest -> most recent crowd log
router.get("/latest", crowdController.getLatest);

// POST /api/crowd -> called by scan.sh to send raw counts
router.post("/", crowdController.postCrowd);

module.exports = router;
