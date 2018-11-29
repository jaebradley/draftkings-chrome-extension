import axios from 'axios';

import parseContestUsers from './parseContestUsers';

const getContestUsersPerPage = async ({ contestId, page }) => {
  const response = await axios.get('https://www.draftkings.com/contest/getentrantsmorewithhep', { params: { contestId, pageNo: page } });
  return parseContestUsers(response.data);
};

const getContestUsers = async ({ contestId }) => {
  const [
    firstPageUsers,
    secondPageUsers,
  ] = await Promise.all([
    getContestUsersPerPage({ contestId, page: 1 }),
    getContestUsersPerPage({ contestId, page: 2 }),
  ]);
  return [...firstPageUsers, ...secondPageUsers];
};

export default getContestUsers;
