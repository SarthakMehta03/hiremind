const express = require("express");

const {

  createCandidate,
  getCandidates,
  deleteCandidate,
  updateCandidate

} = require(
  "../controllers/candidateController"
);

const protect =
  require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  createCandidate
);

router.get(
  "/",
  protect,
  getCandidates
);

router.delete(
  "/:id",
  protect,
  deleteCandidate
);

router.put(
  "/:id",
  protect,
  updateCandidate
);

module.exports = router;