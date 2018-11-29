import handleClickEvent from './handleClickEvent';

const setup = async () => {
  try {
    window.addEventListener('click', event => handleClickEvent(event));
  } catch (e) {
    // Unfortunately, we can't do anything here
  }
};

setup();
