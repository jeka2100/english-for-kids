const BURGER_BUTTON = document.querySelector('#burger-button');
const MENU = document.querySelector('#menu');
const MENU_BACKGROUND = document.querySelector('.header__menu');

const closeMenu = () => {
  BURGER_BUTTON.classList.remove('open');
  MENU.classList.remove('open');
  setTimeout(() => MENU_BACKGROUND.classList.remove('open'), 450);
  document.querySelector('body').classList.remove('overflow-hidden');
};

const openMenu = () => {
  MENU_BACKGROUND.classList.add('open');
  document.querySelector('body').classList.add('overflow-hidden');
  setTimeout(() => MENU.classList.add('open'), 1);
  BURGER_BUTTON.classList.add('open');
};

const ChangeMenuActive = (id) => {
  document.querySelectorAll('#menu > li').forEach((element) => {
    element.classList.remove('active');
  });
  document.querySelector(`.header__menu-content > #${id}`).classList.add('active');
};

export { closeMenu, openMenu, ChangeMenuActive };
