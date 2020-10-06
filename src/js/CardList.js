import categories from './Categories';
import { isPlayMode } from './PlayMode';
import * as menuState from './Menu';

class CardList {
  constructor({ title, image, id }) {
    this.title = title;
    this.image = image;
    this.id = id;
  }

  CreateCard() {
    let template = '';
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = this.id;
    if (isPlayMode()) {
      card.classList.add('play');
    }

    template += `<h3 class="card__name">${this.title}</h3>`;
    template += `<img class="card__image" src=${this.image} alt="card">`;
    card.innerHTML = template;
    return card;
  }
}

const generateCardList = () => {
  const CardList1 = [];
  categories.forEach((element) => {
    CardList1.push(new CardList(element));
  });
  return CardList1;
};

export default function renderCardListToDOM() {
  document.querySelector('.header__text').innerHTML = 'Main page';
  menuState.ChangeMenuActive('mainPage');
  const container = document.querySelector('.cards-list');
  container.innerHTML = '';
  document.querySelector('#mainPage').classList.add('active');
  generateCardList().forEach((element) => {
    container.append(element.CreateCard());
  });
}
