const calculateMatchScore = (
  candidateSkills,
  requiredSkills
) => {

  const matchedSkills =
    candidateSkills.filter(skill =>

      requiredSkills.includes(skill)

    );

  const score = Math.round(

    (
      matchedSkills.length /
      requiredSkills.length
    ) * 100

  );

  return {

    score,

    matchedSkills

  };

};

module.exports =
  calculateMatchScore;