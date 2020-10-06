import renderCardListToDOM from './js/CardList';
import * as menuState from './js/Menu';
import { renderCategoryCardToDOM, RotateCard, PlayAudio } from './js/CategoryCard';
import * as playMode from './js/PlayMode';
import { renderStatisticsToDOM, addTrainClicks } from './js/Statistics';

const CardListArea = document.querySelector('.cards-list');
let gameIsActive = false;

const addBurgerClickHandler = () => {
  const BURGER_BUTTON = document.querySelector('#burger-button');
  BURGER_BUTTON.onclick = () => {
    if (BURGER_BUTTON.classList.contains('open')) {
      menuState.closeMenu();
    } else {
      menuState.openMenu();
    }
  };
};

const addMenuClickHandler = () => {
  const CardMenuArea = document.querySelector('.header__menu');
  CardMenuArea.addEventListener('click', (event) => {
    if (event.target.classList.contains('header__menu')) {
      menuState.closeMenu();
    } else if (event.target.tagName === 'LI') {
      menuState.ChangeMenuActive(event.target.id);
      menuState.closeMenu();
      if (event.target.id === 'mainPage') {
        renderCardListToDOM();
      } else if (event.target.id === 'statistics') {
        renderStatisticsToDOM();
      } else {
        const selectedCategory = event.target;
        document.querySelector('.header__text').innerHTML = selectedCategory.innerHTML;
        renderCategoryCardToDOM(selectedCategory.id);
      }
    }
  });
};

const addCardListClickHandler = () => {
  let playlist = [];
  let word = 0;
  let mistakes = 0;

  CardListArea.addEventListener('click', (event) => {
    if (event.target.closest('.card')) {
      const selectedCard = event.target.closest('.card');
      menuState.ChangeMenuActive(selectedCard.id);
      const categoryName = document.querySelector(`#${selectedCard.id} > .card__name`).innerHTML;
      document.querySelector('.header__text').innerHTML = categoryName;
      renderCategoryCardToDOM(selectedCard.id);
    }


    if (event.target.closest('.category-card')) {
      const selectedCart = event.target.closest('.category-card');
      if (gameIsActive && document.querySelector('.play-button__button').classList.contains('play')) {
        if (selectedCart.id === playlist[word].id) {
          PlayAudio('correct', 'playmode');
          playMode.addStar('correct');
          addTrainClicks(document.querySelector('.cards-list').id, selectedCart.id, 'correct');
          selectedCart.classList.add('inactive');
          word += 1;
          if (word === 8) {
            if (mistakes === 0) {
              playMode.endOfGame('success', mistakes);
              PlayAudio('success', 'playmode');
              setTimeout(() => renderCardListToDOM(), 5000);
            } else {
              playMode.endOfGame('failure', mistakes);
              PlayAudio('failure', 'playmode');
              setTimeout(() => renderCardListToDOM(), 5000);
            }
            gameIsActive = false;
          } else {
            setTimeout(() => playlist[word].play(), 1000);
          }
        } else if (selectedCart.classList.value !== 'category-card inactive') {
          PlayAudio('error', 'playmode');
          playMode.addStar('error');
          addTrainClicks(document.querySelector('.cards-list').id, selectedCart.id, 'mistake');
          mistakes += 1;
        }
      } else if (event.target.id === 'rotate') {
        RotateCard(event.target);
      } else if (!playMode.isPlayMode()) {
        addTrainClicks(document.querySelector('.cards-list').id, selectedCart.id, 'trainClicks');
        PlayAudio(selectedCart.id, document.querySelector('.cards-list').id);
      }
    }

    if (event.target.classList.contains('play-button__button')) {
      if (event.target.classList.value === 'play-button__button play') {
        playlist[word].play();
      } else {
        event.target.classList.add('play');
        const category = document.querySelector('.cards-list').id;
        playlist = playMode.generatePlaylist(category);
        word = 0;
        mistakes = 0;
        playlist[word].play();
        gameIsActive = true;
      }
    }
  });
};

document.querySelector('.switch__input').onclick = () => {
  if (playMode.isPlayMode()) {
    document.querySelectorAll('.card').forEach((element) => {
      element.classList.add('play');
    });
    document.querySelectorAll('.category-card > *').forEach((element) => {
      element.classList.add('play');
    });
    playMode.addButton();
  } else {
    document.querySelectorAll('.card').forEach((element) => {
      element.classList.remove('play');
    });
    document.querySelectorAll('.category-card > *').forEach((element) => {
      element.classList.remove('play');
    });
    document.querySelectorAll('.category-card').forEach((element) => {
      element.classList.remove('inactive');
    });
    if (document.querySelector('.header__text').innerHTML !== 'Main page') {
      document.querySelector('.cards-list__rating-zone').innerHTML = '';
    }
    gameIsActive = false;
    playMode.removeButton();
  }
};

window.onload = () => {
  renderCardListToDOM();
  addBurgerClickHandler();
  addMenuClickHandler();
  addCardListClickHandler();
};
