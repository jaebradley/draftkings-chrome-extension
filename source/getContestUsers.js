import axios from 'axios';

import parseContestUsers from './parseContestUsers';

const getContestUsers = async ({ contestId, pageNumber }) => {
  const response = await axios.get('https://www.draftkings.com/contest/getentrantsmorewithhep?contestId=64784084&pageNo=2', { params: { contestId, pageNo: pageNumber } });
  return parseContestUsers(response.data);
};

export default getContestUsers;
