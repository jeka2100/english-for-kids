import * as words from './Words';
import { isPlayMode, addButton } from './PlayMode';

class CategoryCard {
  constructor({ word, translation, image }) {
    this.word = word;
    this.translation = translation;
    this.image = image;
  }

  CreateCard() {
    let templateFront = '';
    let templateBack = '';
    const card = document.createElement('div');
    const cardFront = document.createElement('div');
    const cardBack = document.createElement('div');
    card.classList.add('category-card');
    cardFront.classList.add('category-card_front');
    cardBack.classList.add('category-card_back');
    if (isPlayMode()) {
      cardFront.classList.add('play');
      cardBack.classList.add('play');
    }
    card.id = this.word;
    templateFront += `<img class="category-card__image" src=${this.image} alt="card">`;
    templateFront += `<h3 class="category-card__name">${this.word}</h3>`;
    templateBack += `<img class="category-card__image" src=${this.image} alt="card">`;
    templateBack += `<h3 class="category-card__name">${this.translation}</h3>`;
    cardFront.innerHTML = templateFront;
    cardBack.innerHTML = templateBack;
    card.append(cardFront, cardBack);
    if (isPlayMode()) {
      card.innerHTML += '<img class="category-card__rotate play" id="rotate" src="./img/sitedecor/rotate.svg" alt="rotate">';
    } else {
      card.innerHTML += '<img class="category-card__rotate" id="rotate" src="./img/sitedecor/rotate.svg" alt="rotate">';
    }
    return card;
  }
}

const generateRatingZone = () => {
  const ratingZone = document.createElement('div');
  ratingZone.classList.add('cards-list__rating-zone');
  return ratingZone;
};

const generateCategoryCard = (categories) => {
  const CategoryCard1 = [];
  categories.forEach((element) => {
    CategoryCard1.push(new CategoryCard(element));
  });
  return CategoryCard1;
};

const renderCategoryCardToDOM = (category) => {
  const container = document.querySelector('.cards-list');
  container.id = category;
  container.innerHTML = '';
  container.append(generateRatingZone());
  generateCategoryCard(words[`${category}Words`]).forEach((element) => {
    container.append(element.CreateCard());
  });
  if (isPlayMode()) {
    addButton();
  }
};

const RotateCard = (element) => {
  const { id } = element.closest('.category-card');
  document.querySelector(`#${id} > .category-card_front`).classList.add('rotate');
  document.querySelector(`#${id} > .category-card_back`).classList.add('rotate');
  element.classList.add('rotate');
  document.querySelector(`#${id}`).onmouseleave = () => {
    document.querySelector(`#${id} > .category-card_front`).classList.remove('rotate');
    document.querySelector(`#${id} > .category-card_back`).classList.remove('rotate');
    document.querySelector(`#${id} > .category-card__rotate`).classList.remove('rotate');
  };
};

const PlayAudio = (word, category) => {
  const audio = new Audio(`./audio/${category}/${word}.mp3`);
  audio.play();
};

export { renderCategoryCardToDOM, RotateCard, PlayAudio };
