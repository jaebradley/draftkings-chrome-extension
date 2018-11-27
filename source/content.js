import appendIcons from './appendIcons';

const setup = async () => {
  try {
    console.log('Hello DraftKings lobby!');
    // class is slick-cell l5 r5
    // a tag with a Data-Tracking attribute with a value equal to "entries"
    // class slick-cell l7 r7 has a tag with data-contest-id attribute to get contest id
    // Iterate over all divs with class ui-widget-content slick-row
    // Get the contest id from slick-cell l7 r7
    // Append an icon as sibling of l5 r5 with an
    // on click that displays ratio of experienced players
    appendIcons();
    return null;
  } catch (e) {
    console.error('DraftKings Extension error: ', e);
    return null;
  }
};

setup();
