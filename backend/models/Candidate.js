const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  skills: {
    type: [String]
  },

  experience: {
    type: String
  },

  status: {
    type: String,
    default: "Applied"
  },
  resume: {
  type: String
},

}, {
  timestamps: true
});

module.exports =
  mongoose.model(
    "Candidate",
    candidateSchema
  );