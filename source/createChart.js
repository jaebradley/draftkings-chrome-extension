import Chart from 'chart.js';

import {
  EXPERIENCE_LEVELS,
} from './constants';

const EXPERIENCE_LEVELS_TO_LABELS = {
  [EXPERIENCE_LEVELS.NO_LEVEL]: 'None',
  [EXPERIENCE_LEVELS.ENTERED_AT_LEAST_500_CONTESTS]: '500+ Contests',
  [EXPERIENCE_LEVELS.ENTERED_AT_LEAST_1000_CONTESTS]: '1000+ Contests',
  [EXPERIENCE_LEVELS.BIG_WIN]: 'Big Win',
  [EXPERIENCE_LEVELS.ENTERED_AT_LEAST_500_CONTESTS_AND_BIG_WIN]: '500+ Contests & Big Win',
  [EXPERIENCE_LEVELS.ENTERED_AT_LEAST_1000_CONTESTS_AND_BIG_WIN]: '1000+ Contests & Big Win',
};

const createChart = ({ canvas, aggregatedContestUsers }) => {
  const labels = Object.keys(EXPERIENCE_LEVELS).map(level => EXPERIENCE_LEVELS_TO_LABELS[level]);
  const data = Object.keys(EXPERIENCE_LEVELS).map(level => aggregatedContestUsers[level]);

  return new Chart(canvas, {
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [
        {
          label: '# of Entrants',
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Entrants (that DK publicly exposes) by Badge Level',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};

export default createChart;
