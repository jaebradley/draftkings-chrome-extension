import elementReady from 'element-ready';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/themes/light.css';

import aggregateContestUsersByExperience from './aggregateContestUsersByExperience';
import getContestUsers from './getContestUsers';
import createChart from './createChart';

const ICON_ID = 'draftkings-chrome-extension-more-information-icon';
const CONTEST_DETAILS_MODAL_ID = 'contest-details-pop';
const ENTRANTS_LABEL_SELECTOR = 'div.dk-black-rounded-panel.entrants-list > label';

const createIcon = () => {
  const icon = document.createElement('img');
  icon.id = ICON_ID;
  icon.src = global.chrome.extension.getURL('./info.svg');
  icon.setAttribute('style', 'max-height: 20px; padding-left: 5px; vertical-align: sub');
  return icon;
};

const createCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'myChart';
  canvas.height = 600;
  canvas.width = 1000;
  canvas.setAttribute('style', 'height="600"; width="1000"');
  return canvas;
};

const createIconAndTooltip = async () => {
  const icon = createIcon();
  const entrantsLabel = document.querySelector(ENTRANTS_LABEL_SELECTOR);
  entrantsLabel.insertAdjacentElement('afterend', icon);

  const contestId = document.querySelector(`#${CONTEST_DETAILS_MODAL_ID}`).getAttribute('data-contest-id');
  let contestUsers;
  try {
    contestUsers = await getContestUsers({ contestId });
  } catch (e) {
    tippy(icon, {
      content: 'Whoops! Unable to load contest users 😭',
      size: 'large',
      theme: 'light',
    });
    return null;
  }
  const aggregatedContestUsers = aggregateContestUsersByExperience(contestUsers);

  const canvas = createCanvas();
  entrantsLabel.insertAdjacentElement('beforebegin', canvas);

  createChart({ canvas, aggregatedContestUsers });

  tippy(icon, {
    content: canvas,
    interactive: true,
    size: 'large',
    interactiveBorder: 15,
    sticky: true,
    theme: 'light',
  });

  return null;
};

const handleClickEvent = async (event) => {
  const contestCells = Array.prototype.slice.call(document.querySelectorAll('.slick-cell'));
  const isAContestCellClick = contestCells.some(cell => cell.contains(event.target));

  if (isAContestCellClick) {
    await Promise.all([
      elementReady(ENTRANTS_LABEL_SELECTOR),
      elementReady(`#${CONTEST_DETAILS_MODAL_ID}`),
    ]);

    await createIconAndTooltip();
  }
};

export default handleClickEvent;
