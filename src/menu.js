import menuImg from './assets/images/menu-image.jpg';

function loadMenu() {
  document
    .querySelectorAll('nav button')
    .forEach((btn) => btn.classList.remove('active'));

  const menuButton = document.getElementById('menu-tab');
  menuButton.classList.add('active');

  const container = document.querySelector('.container');
  container.style.backgroundImage = `url(${menuImg})`;
  container.style.backgroundSize = 'cover';
  container.style.backgroundPosition = 'center';
  container.style.position = 'relative';
  container.classList.add('menu-blur');

  const content = document.getElementById('content');
  content.innerHTML = '';

  const menuSplit = document.createElement('div');
  menuSplit.classList.add('menu-split');

  const imgDiv = document.createElement('div');
  imgDiv.classList.add('menu-img-side');
  const img = document.createElement('img');
  img.src = menuImg;
  img.alt = 'Menu';
  imgDiv.appendChild(img);

  const menuTextDiv = document.createElement('div');
  menuTextDiv.classList.add('menu-text-side');
  menuTextDiv.innerHTML = `
  <h2>Our Meat Menu</h2>
  <ul>
    <li>Grilled Ribeye Steak <span>$ 22</span></li>
    <li>BBQ Pork Ribs <span>$ 18</span></li>
    <li>Roast Beef Sandwich <span>$ 12</span></li>
    <li>Beef Burger Deluxe <span>$ 14</span></li>
    <li>Chicken Parmesan <span>$13</span></li>
    <li>Lamb Chops with Herbs <span>$ 20</span></li>
    <li>Spicy Sausage Platter <span>$ 11</span></li>
  </ul>
`;

  menuSplit.append(imgDiv, menuTextDiv);
  content.appendChild(menuSplit);
}

export default loadMenu;
