import cheerio from 'cheerio';

import {
  EXPERIENCE_CLASS_NAME_TO_EXPERIENCE_LEVEL,
  EXPERIENCE_LEVELS,
} from './constants';

/**
 *
 * Response is a tr wrapping a bunch of tds that contain username and experience information
 * However, cheerio parses this response as an html body with a bunch of spans
 */

const parseContestUsers = (content) => {
  const $ = cheerio.load(`<table>${content}</table>`);
  return $('td').map((_, el) => ({
    user: $(el).find('span[class="entrant-username"]').text(),
    experience: EXPERIENCE_CLASS_NAME_TO_EXPERIENCE_LEVEL[$(el).find('span[title="Experience Badge"]').attr('class')]
                || EXPERIENCE_LEVELS.NO_LEVEL,
  })).toArray();
};

export default parseContestUsers;
