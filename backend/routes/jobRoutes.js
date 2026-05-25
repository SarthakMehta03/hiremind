const express = require("express");

const {
    createJob,
    getJobs
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE JOB
router.post("/", protect, createJob);


// GET JOBS
router.get("/", protect, getJobs);


module.exports = router;