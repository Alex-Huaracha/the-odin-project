const container = document.querySelector('.container');

const defaultGridSize = () => {
  const gridSquare = 16;
  createGridSquare(gridSquare);
};

const createGridSquare = (gridSquare) => {
  const squareSize = 400 / gridSquare;

  for (let i = 0; i < gridSquare; i++) {
    for (let j = 0; j < gridSquare; j++) {
      const div = document.createElement('div');
      div.style.width = `${squareSize}px`;
      div.style.height = `${squareSize}px`;
      container.appendChild(div);
    }
  }
};

container.addEventListener('mouseover', (event) => {
  if (event.target.tagName === 'DIV') {
    // Si es la primera vez que se toca el cuadrado
    if (
      !event.target.style.backgroundColor ||
      event.target.style.backgroundColor === 'white'
    ) {
      // Generar colores RGB aleatorios
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);

      // Guardar los colores originales como atributos personalizados
      event.target.dataset.originalRed = red;
      event.target.dataset.originalGreen = green;
      event.target.dataset.originalBlue = blue;
      event.target.dataset.interactions = 1;

      event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    } else {
      // Oscurecer el color existente en 10%
      const interactions = parseInt(event.target.dataset.interactions) || 0;

      if (interactions < 10) {
        const originalRed = parseInt(event.target.dataset.originalRed);
        const originalGreen = parseInt(event.target.dataset.originalGreen);
        const originalBlue = parseInt(event.target.dataset.originalBlue);

        // Calcular el factor de oscurecimiento (90% cada vez)
        const darkenFactor = Math.pow(0.9, interactions);

        const newRed = Math.floor(originalRed * darkenFactor);
        const newGreen = Math.floor(originalGreen * darkenFactor);
        const newBlue = Math.floor(originalBlue * darkenFactor);

        event.target.style.backgroundColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
        event.target.dataset.interactions = interactions + 1;
      } else {
        event.target.style.backgroundColor = 'black';
      }
    }
  }
});

const button = document.querySelector('button');
button.addEventListener('click', () => {
  const userInput = prompt('Enter number of squares per side (max 100):');
  const value = parseInt(userInput);

  if (value >= 1 && value <= 100) {
    container.innerHTML = '';
    createGridSquare(value);
  } else {
    alert('Please enter a number between 1 and 100');
  }
});

defaultGridSize();
