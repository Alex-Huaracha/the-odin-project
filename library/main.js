// Functionality for book form
const form = document.querySelector('#book-form');

const myLibrary = [];

function defaultBooks() {
  const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 310, 'read');
  const book2 = new Book('1984', 'George Orwell', 328, 'not-read');
  const book3 = new Book('To Kill a Mockingbird', 'Harper Lee', 281, 'reading');
  addBookToLibrary(book1);
  addBookToLibrary(book2);
  addBookToLibrary(book3);
  renderLibrary();
}

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read === 'read'
        ? 'read'
        : this.read === 'reading'
        ? 'reading'
        : 'not read yet'
    }`;
  }
}

function renderLibrary() {
  const notReadDiv = document.querySelector('#not-read-column .books');
  const readingDiv = document.querySelector('#reading-column .books');
  const readDiv = document.querySelector('#read-column .books');

  notReadDiv.innerHTML = '';
  readingDiv.innerHTML = '';
  readDiv.innerHTML = '';

  myLibrary.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';

    const title = document.createElement('h4');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.innerHTML = `<strong>Author:</strong> ${book.author}`;

    const pages = document.createElement('p');
    pages.innerHTML = `<strong>Pages:</strong> ${book.pages}`;

    const readSelect = document.createElement('select');
    ['not-read', 'reading', 'read'].forEach((opt) => {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent =
        opt === 'not-read'
          ? 'Not Read'
          : opt.charAt(0).toUpperCase() + opt.slice(1);
      if (book.read === opt) option.selected = true;
      readSelect.appendChild(option);
    });
    readSelect.addEventListener('change', (e) => {
      book.read = e.target.value;
      renderLibrary();
    });

    const deleteBtn = document.createElement('button');
    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'icons/delete-icon.svg';
    deleteIcon.alt = 'Delete book';
    deleteBtn.prepend(deleteIcon);

    deleteBtn.addEventListener('click', () => {
      const idx = myLibrary.findIndex((b) => b.id === book.id);
      if (idx !== -1) {
        myLibrary.splice(idx, 1);
        renderLibrary();
      }
    });

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readSelect);
    bookCard.appendChild(deleteBtn);

    if (book.read === 'not-read') {
      notReadDiv.appendChild(bookCard);
    } else if (book.read === 'reading') {
      readingDiv.appendChild(bookCard);
    } else if (book.read === 'read') {
      readDiv.appendChild(bookCard);
    }
  });
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  renderLibrary();
}

function setCustomValidationMessages() {
  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const pagesInput = document.querySelector('#pages');

  titleInput.addEventListener('input', function () {
    if (this.validity.valueMissing) {
      this.setCustomValidity('The book title must be filled!');
    } else if (this.validity.tooShort) {
      this.setCustomValidity('Title must be at least 2 characters long!');
    } else if (this.validity.tooLong) {
      this.setCustomValidity('Title is too long! Maximum 100 characters.');
    } else {
      this.setCustomValidity('');
    }
  });

  authorInput.addEventListener('input', function () {
    if (this.validity.valueMissing) {
      this.setCustomValidity('The author name must be filled!');
    } else if (this.validity.tooShort) {
      this.setCustomValidity('Author name must be at least 2 characters long!');
    } else if (this.validity.tooLong) {
      this.setCustomValidity('Author name is too long! Maximum 50 characters.');
    } else {
      this.setCustomValidity('');
    }
  });

  pagesInput.addEventListener('input', function () {
    if (this.validity.valueMissing) {
      this.setCustomValidity('Number of pages must be filled!');
    } else if (this.validity.rangeUnderflow) {
      this.setCustomValidity('Number of pages must be at least 1!');
    } else if (this.validity.rangeOverflow) {
      this.setCustomValidity(
        'Number of pages seems unrealistic! Maximum 10,000.'
      );
    } else if (this.validity.badInput) {
      this.setCustomValidity('Please enter a valid number for pages!');
    } else {
      this.setCustomValidity('');
    }
  });
}

function setupRealTimeValidation() {
  const inputs = document.querySelectorAll('#book-form input');

  inputs.forEach((input) => {
    input.addEventListener('blur', function () {
      if (!this.checkValidity()) {
        this.reportValidity();
      }
    });
  });
}

document.querySelector('#add-book').addEventListener('click', () => {
  document.querySelector('#modal').classList.remove('hidden');
});

document.querySelector('#close-modal').addEventListener('click', () => {
  document.querySelector('#modal').classList.add('hidden');
});

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const title = formData.get('title').trim();
  const author = formData.get('author').trim();
  const pages = parseInt(formData.get('pages'));
  const readStatus = formData.get('read-status');

  const newBook = new Book(title, author, pages, readStatus);
  addBookToLibrary(newBook);
  form.reset();

  const inputs = form.querySelectorAll('input');
  inputs.forEach((input) => input.setCustomValidity(''));

  document.querySelector('#modal').classList.add('hidden');
});

window.addEventListener('load', function () {
  setCustomValidationMessages();
  setupRealTimeValidation();
  defaultBooks();
});
