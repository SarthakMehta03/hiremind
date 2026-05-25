const express = require("express");

const {
  createJob,
  getJobs,
  deleteJob,
  updateJob
} = require("../controllers/jobController");

const protect =
  require("../middleware/authMiddleware");

const router = express.Router();


// CREATE JOB
router.post(
  "/",
  protect,
  createJob
);


// GET JOBS
router.get(
  "/",
  protect,
  getJobs
);


// DELETE JOB
router.delete(
  "/:id",
  protect,
  deleteJob
);


// UPDATE JOB
router.put(
  "/:id",
  protect,
  updateJob
);

module.exports = router;