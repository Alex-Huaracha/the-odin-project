import restaurantImg from './assets/images/home-image.jpg';
import instagramAsset from './assets/icons/instagram.svg';
import tiktokIconAsset from './assets/icons/tiktok.svg';

function loadHome() {
  document
    .querySelectorAll('nav button')
    .forEach((btn) => btn.classList.remove('active'));

  const homeButton = document.getElementById('home-tab');
  homeButton.classList.add('active');

  const content = document.getElementById('content');
  content.innerHTML = '';

  const container = document.querySelector('.container');
  container.classList.remove('menu-blur');
  container.style.backgroundImage = `url(${restaurantImg})`;
  container.style.backgroundSize = 'cover';
  container.style.backgroundPosition = 'center';

  const homeDiv = document.createElement('div');
  homeDiv.classList.add('home-content');

  const headline = document.createElement('h1');
  headline.textContent = 'Welcome to Our Restaurant';

  const description = document.createElement('p');
  description.textContent = 'The best food in town!';

  const hours = document.createElement('p');
  hours.textContent = 'Mon-Sat 11:00 AM - 10:00 PM | Sun 12:00 PM - 8:00 PM';

  // Address
  const address = document.createElement('p');
  address.textContent = '123 Flavor Street, Food City, Perú';
  address.style.marginTop = '8px';

  // Social media buttons container
  const socialDiv = document.createElement('div');

  const instagramBtn = document.createElement('button');
  instagramBtn.classList.add('social-btn');

  const instagramIcon = document.createElement('img');
  instagramIcon.src = instagramAsset;
  instagramIcon.alt = 'Instagram';
  instagramBtn.prepend(instagramIcon);

  const tiktokBtn = document.createElement('button');
  tiktokBtn.classList.add('social-btn');

  const tiktokIcon = document.createElement('img');
  tiktokIcon.src = tiktokIconAsset;
  tiktokIcon.alt = 'TikTok';
  tiktokBtn.prepend(tiktokIcon);

  socialDiv.appendChild(instagramBtn);
  socialDiv.appendChild(tiktokBtn);

  homeDiv.appendChild(headline);
  homeDiv.appendChild(description);
  homeDiv.appendChild(hours);
  homeDiv.appendChild(address);
  homeDiv.appendChild(socialDiv);

  content.appendChild(homeDiv);
}

export default loadHome;
