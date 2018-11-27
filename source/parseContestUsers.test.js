import fs from 'fs-extra';

import parseContestUsers from './parseContestUsers';
import {
  EXPERIENCE_LEVELS,
} from './constants';

describe('parseContestUsers', () => {
  let html;

  beforeEach(async () => {
    html = await fs.readFile(`${__dirname}/parseContestUsers.test.html`, 'utf8');
  });

  it('parses user details from html', () => {
    const users = parseContestUsers(html);
    expect(users.length).toEqual(99);
    const sackmole = users[0];
    expect(sackmole.user).toEqual('sackmole');
    expect(sackmole.experience).toEqual(
      EXPERIENCE_LEVELS.ENTERED_AT_LEAST_1000_CONTESTS_AND_BIG_WIN,
    );
    const dfisher928 = users[3];
    expect(dfisher928).toEqual({ user: 'dfisher928', experience: undefined });
  });
});
