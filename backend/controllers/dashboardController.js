const Job = require("../models/Job");

const Candidate =
  require("../models/Candidate");


// GET DASHBOARD STATS
const getDashboardStats =
async (req, res) => {

  try {

    // COUNT JOBS
    const totalJobs =
      await Job.countDocuments();

    // COUNT CANDIDATES
    const totalCandidates =
      await Candidate.countDocuments();

    // STATIC FOR NOW
    const totalInterviews = 18;

    const totalHires = 8;

    res.status(200).json({

      totalJobs,

      totalCandidates,

      totalInterviews,

      totalHires

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

module.exports = {
  getDashboardStats
};