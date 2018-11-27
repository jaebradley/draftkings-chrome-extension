const appendIcons = () => {
  const rows = document.querySelectorAll('div.ui-widget-content.slick-row');
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const contestId = row.querySelector('div.slick-cell.l7.r7 > a').getAttribute('data-contest-id');
    const entriesCell = row.querySelector('div.slick-cell.l5.r5 > a[data-tracking="Entries"]');
    const button = document.createElement('button');
    button.innerHTML = 'Click Me';
    button.onclick = () => alert('test');
    entriesCell.insertAdjacentElement('afterend', button);
  }
};

export default appendIcons;
