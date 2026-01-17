import contactImg from './assets/images/contact-image.jpg';
import instagramAsset from './assets/icons/instagram.svg';
import tiktokIconAsset from './assets/icons/tiktok.svg';

function loadContact() {
  document
    .querySelectorAll('nav button')
    .forEach((btn) => btn.classList.remove('active'));

  const contactButton = document.getElementById('contact-tab');
  contactButton.classList.add('active');

  const content = document.getElementById('content');
  content.innerHTML = '';

  const container = document.querySelector('.container');
  container.classList.remove('menu-blur');
  container.style.backgroundImage = `url(${contactImg})`;
  container.style.backgroundSize = 'cover';
  container.style.backgroundPosition = 'center';

  const contactDiv = document.createElement('div');
  contactDiv.classList.add('contact-content');

  const headline = document.createElement('h1');
  headline.textContent = 'Contact Us';

  const description = document.createElement('p');
  description.textContent = 'How to get in touch?';

  const details = document.createElement('p');
  details.textContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  // Info and Form Group
  const infoFormGroup = document.createElement('div');
  infoFormGroup.classList.add('info-form-group');

  const address = document.createElement('p');
  address.textContent = 'Direction: 123 Flavor Street, Food City, Perú';

  const phone = document.createElement('p');
  phone.textContent = 'Phone: (123) 456-7890';

  const email = document.createElement('p');
  email.textContent = 'Email: contact@contact.com';

  const infoCol = document.createElement('div');
  infoCol.classList.add('info-col');
  infoCol.append(address, phone, email);

  // Form with groups
  const formCol = document.createElement('div');
  formCol.classList.add('form-col');
  const form = document.createElement('form');

  // Name group
  const nameEmailGroup = document.createElement('div');
  nameEmailGroup.classList.add('form-group', 'form-group-row'); // Puedes usar una clase extra para estilos en fila

  const inputName = document.createElement('input');
  inputName.type = 'text';
  inputName.placeholder = 'Your Name';
  inputName.required = true;

  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.placeholder = 'Your Email';
  inputEmail.required = true;

  nameEmailGroup.append(inputName, inputEmail);

  // Subject group
  const subjectGroup = document.createElement('div');
  subjectGroup.classList.add('form-group');
  const formSubject = document.createElement('input');
  formSubject.type = 'text';
  formSubject.placeholder = 'Subject';
  formSubject.required = true;
  subjectGroup.appendChild(formSubject);

  // Message group
  const messageGroup = document.createElement('div');
  messageGroup.classList.add('form-group');
  const formMessage = document.createElement('textarea');
  formMessage.placeholder = 'Your Message';
  formMessage.rows = 4;
  formMessage.required = true;
  messageGroup.appendChild(formMessage);

  // Submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Send Message';

  form.append(nameEmailGroup, subjectGroup, messageGroup, submitButton);
  formCol.appendChild(form);

  infoFormGroup.append(infoCol, formCol);

  contactDiv.append(headline, description, details, infoFormGroup);
  content.appendChild(contactDiv);
}

export default loadContact;
