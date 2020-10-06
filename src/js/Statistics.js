import * as words from './Words';
import * as menuState from './Menu';

let wordsStorage;
if (localStorage.getItem('words') !== 'undefined') {
  wordsStorage = JSON.parse(localStorage.getItem('words'));
}

class Statistics {
  constructor({
    word, translation, image, trainClicks, correct, mistake,
  }) {
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.trainClicks = trainClicks;
    this.correct = correct;
    this.mistake = mistake;
  }

  CreateCard() {
    let template = '';
    const card = document.createElement('div');
    card.classList.add('card-stat');
    template += `<img class="card-stat__image" src=${this.image} alt="card">`;
    template += `<h3 class="card-stat__text">Word: ${this.word}</h3>`;
    template += `<h3 class="card-stat__text">Translation: ${this.translation}</h3>`;
    template += `<h3 class="card-stat__text">Clicks on train: ${this.trainClicks}</h3>`;
    template += `<h3 class="card-stat__text">Correct clicks: ${this.correct}</h3>`;
    template += `<h3 class="card-stat__text">Error clicks: ${this.mistake}</h3>`;
    template += `<h3 class="card-stat__text">Percent of errors: ${(this.correct === 0 && this.mistake === 0) ? 0 : Math.floor((this.mistake / (this.mistake + this.correct)) * 100)}%</h3>`;
    card.innerHTML = template;
    return card;
  }
}

const generateStatistics = (selectedWords) => {
  const CardStat = [];
  Object.keys(selectedWords).forEach((element) => {
    selectedWords[element].forEach((el) => {
      CardStat.push(new Statistics(el));
    });
  });
  return CardStat;
};

const renderStatisticsToDOM = () => {
  document.querySelector('.header__text').innerHTML = 'Statistics';
  menuState.ChangeMenuActive('statistics');
  const container = document.querySelector('.cards-list');
  container.innerHTML = '';
  document.querySelector('#statistics').classList.add('active');
  generateStatistics(wordsStorage || words).forEach((element) => {
    container.append(element.CreateCard());
  });
};

const addTrainClicks = (category, selectedWord, param) => {
  const selectedCategory = wordsStorage ? wordsStorage[`${category}Words`] : words[`${category}Words`];
  for (let i = 0; i < selectedCategory.length; i += 1) {
    if (selectedCategory[i].word === selectedWord) {
      selectedCategory[i][param] += 1;
    }
  }
  localStorage.setItem('words', JSON.stringify(wordsStorage || words));
};

export { renderStatisticsToDOM, addTrainClicks };
