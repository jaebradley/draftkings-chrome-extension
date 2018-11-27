const aggregateContestUsersByExperience = (users) => {
  const aggregation = {};

  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];

    if (aggregation[user.experience] == null) {
      aggregation[user.experience] = 1;
    } else {
      aggregation[user.experience] += 1;
    }
  }

  return aggregation;
};

export default aggregateContestUsersByExperience;
