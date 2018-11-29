import elementReady from 'element-ready';
import Chart from 'chart.js';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

import {
  EXPERIENCE_LEVELS,
} from './constants';
import aggregateContestUsersByExperience from './aggregateContestUsersByExperience';
import getContestUsers from './getContestUsers';

const onMoreInfoClick = async (contestId) => {
  const contestUsers = await getContestUsers({ contestId });
  console.log('contestUsers', contestUsers);
  const aggregatedContestUsers = aggregateContestUsersByExperience(contestUsers);
  console.log(aggregatedContestUsers);
  const canvas = document.createElement('canvas');
  canvas.id = 'myChart';
  canvas.setAttribute('style', 'height="400"; width="400"');
  document.querySelector('div.dk-black-rounded-panel.entrants-list > label').insertAdjacentElement('beforebegin', canvas);
  const data = Object.keys(EXPERIENCE_LEVELS).map(key => aggregatedContestUsers[key]);
  const myChart = new Chart(canvas, {
    type: 'horizontalBar',
    data: {
      labels: Object.keys(EXPERIENCE_LEVELS),
      datasets: [{
          label: '# of Votes',
          data,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });
  const button = document.querySelector('#draftkings-chrome-extension-more-information-icon');
  tippy(button, { content: canvas, interactive: true, size: 'large', interactiveBorder: 15, sticky: true });
};

const pollForButton = async (event) => {
  if (Array.prototype.slice.call(document.querySelectorAll('.slick-cell')).includes(event.target.parentElement) || Array.prototype.slice.call(document.querySelectorAll('.slick-cell')).includes(event.target.parentElement.parentElement)) {
    console.log('fucking here');
    await elementReady('div.dk-black-rounded-panel.entrants-list > label');

    const contestId = document.querySelector('#contest-details-pop').getAttribute('data-contest-id');
    console.log(contestId);
    const button = document.createElement('img');
    button.id = 'draftkings-chrome-extension-more-information-icon';
    button.src = chrome.extension.getURL('./info.svg');
    button.setAttribute('style', 'max-height: 20px; padding-left: 5px; ');
    document.querySelector('div.dk-black-rounded-panel.entrants-list > label').insertAdjacentElement('afterend', button);
    await onMoreInfoClick(contestId);
  }
};

const doIt = async () => {
  window.addEventListener('click', (e) => pollForButton(e));
};
// Attach onclick handlers for entries modal
// When it's clicked, start polling for document.querySelector('div.dk-black-rounded-panel.entrants-list > label')
// If found append a button
// If button clicked then show values

export default doIt;
