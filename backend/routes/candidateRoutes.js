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

const upload =
  require("../middleware/uploadMiddleware");

const router = express.Router();

const {parseResume} = require("../services/aiService");

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

router.post(

  "/upload",

  protect,

  upload.single("resume"),

  async (req, res) => {

    try {

      // PARSE RESUME
      const aiData =
        await parseResume(

          req.file.path

        );

      res.status(200).json({

        filePath:
          req.file.path,

        extractedSkills:
          aiData.skills,

        resumeText:
          aiData.resume_text

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);

module.exports = router;