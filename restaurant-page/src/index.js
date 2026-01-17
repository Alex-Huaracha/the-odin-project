import './style.css';
import loadHome from './home';
import loadMenu from './menu';
import loadContact from './contact';

const handleTabClick = (e) => {
  const id = e.target.id;
  if (id === 'home-tab') {
    loadHome();
  } else if (id === 'menu-tab') {
    loadMenu();
  } else if (id === 'contact-tab') {
    loadContact();
  }
};

document.querySelectorAll('nav button').forEach((button) => {
  button.addEventListener('click', handleTabClick);
});

document.addEventListener('DOMContentLoaded', loadHome);
