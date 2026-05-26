const express = require("express");

const {

  matchCandidates

} = require(
  "../controllers/aiController"
);

const protect =
  require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/match/:jobId",
  protect,
  matchCandidates
);

module.exports = router;