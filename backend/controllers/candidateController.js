const Candidate =
  require("../models/Candidate");


// CREATE
const createCandidate =
async (req, res) => {

  try {

    const candidate =
      await Candidate.create(req.body);

    res.status(201).json(candidate);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET ALL
const getCandidates =
async (req, res) => {

  try {

    const candidates =
      await Candidate.find();

    res.status(200).json(candidates);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

//update
const updateCandidate =
async (req, res) => {

  try {

    const updatedCandidate =
      await Candidate.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }

      );

    res.status(200).json(
      updatedCandidate
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// DELETE
const deleteCandidate =
async (req, res) => {

  try {

    await Candidate.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Candidate deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {

  createCandidate,
  getCandidates,
  deleteCandidate,
  updateCandidate

};