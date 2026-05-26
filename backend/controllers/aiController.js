const Job =
  require("../models/Job");

const Candidate =
  require("../models/Candidate");

const calculateMatchScore =
  require("../utils/matchScore");


// AI MATCHING
const matchCandidates =
async (req, res) => {

  try {

    // FIND JOB
    const job =
      await Job.findById(
        req.params.jobId
      );

    // FIND ALL CANDIDATES
    const candidates =
      await Candidate.find();

    // MATCHING
    const matchedCandidates =
      candidates.map(candidate => {

        const result =
          calculateMatchScore(

            candidate.skills,

            job.skillsRequired

          );

        return {

          candidate,

          score: result.score,

          matchedSkills:
            result.matchedSkills

        };

      });

    // SORT DESCENDING
    matchedCandidates.sort(

      (a, b) =>
        b.score - a.score

    );

    res.status(200).json(
      matchedCandidates
    );

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

module.exports = {
  matchCandidates
};