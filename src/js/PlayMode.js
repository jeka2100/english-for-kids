import * as words from './Words';

const CardListArea = document.querySelector('.cards-list');

const isPlayMode = () => document.querySelector('.switch__input').checked;

const addButton = () => {
  if (document.querySelector('.header__text').innerHTML !== 'Main page') {
    const button = document.createElement('div');
    button.classList.add('play-button');
    button.innerHTML = '<button class="play-button__button">Start</button>';
    CardListArea.append(button);
  }
};

const removeButton = () => {
  if (document.querySelector('.header__text').innerHTML !== 'Main page') {
    document.querySelector('.play-button').remove();
  }
};

const generatePlaylist = (category) => {
  let i = 0;
  const playlist = [];
  words[`${category}Words`].forEach((element) => {
    playlist[i] = new Audio(`./audio/${category}/${element.word}.mp3`);
    playlist[i].id = element.word;
    i += 1;
  });
  return playlist.sort(() => Math.random() - 0.5);
};

const addStar = (starType) => {
  const ratingZone = document.querySelector('.cards-list__rating-zone');
  const star = document.createElement('div');
  if (starType === 'correct') {
    star.classList.add('star-correct');
  } else {
    star.classList.add('star-error');
  }
  ratingZone.prepend(star);
};

const endOfGame = (result, mistakes) => {
  const container = document.querySelector('.cards-list');

  if (mistakes === 0) {
    container.innerHTML = `<div class="cards-list__${result}"></div>`;
  } else {
    container.innerHTML = `<div class="cards-list__${result}"><div class="result__mistakes">Mistakes: ${mistakes}</div></div>`;
  }
};

export {
  isPlayMode, addButton, removeButton, generatePlaylist, addStar, endOfGame,
};
