import { useState } from 'react';
import gameImage from '../assets/game-image.webp';
import '../App.css';

function Game() {
  const [targetBox, setTargetBox] = useState({ show: false, x: 0, y: 0 });

  const [foundCharacters, setFoundCharacters] = useState([]);

  const [feedback, setFeedback] = useState(null);

  const handleImageClick = (e) => {
    if (feedback) setFeedback(null);

    const { offsetX, offsetY } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = e.target;

    const relativeX = (offsetX / offsetWidth) * 100;
    const relativeY = (offsetY / offsetHeight) * 100;

    // console.log(
    //   `Position: X=${relativeX.toFixed(2)}, Y=${relativeY.toFixed(2)}`
    // );

    setTargetBox({
      show: !targetBox.show,
      x: relativeX,
      y: relativeY,
    });
  };

  const handleCharacterSelect = async (characterName) => {
    if (foundCharacters.some((char) => char.name === characterName)) {
      setFeedback({
        type: 'error',
        text: `You already found ${characterName}!`,
      });
      setTargetBox({ ...targetBox, show: false });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterName,
          x: targetBox.x,
          y: targetBox.y,
        }),
      });

      const data = await response.json();

      if (data.found) {
        setFeedback({ type: 'success', text: data.message });
        setFoundCharacters([
          ...foundCharacters,
          { name: characterName, x: targetBox.x, y: targetBox.y },
        ]);
      } else {
        // FALLO
        setFeedback({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error validating:', error);
      setFeedback({ type: 'error', text: 'Connection error with the server' });
    }

    setTargetBox({ ...targetBox, show: false });
  };

  return (
    <div className="game-container">
      {feedback && (
        <div className={`feedback-msg ${feedback.type}`}>{feedback.text}</div>
      )}

      <img
        src={gameImage}
        alt="Find Pokemon"
        className="game-image"
        onClick={handleImageClick}
      />

      {foundCharacters.map((char, index) => (
        <div
          key={index}
          className="marker-found"
          style={{ left: `${char.x}%`, top: `${char.y}%` }}
        >
          <span className="tooltip">{char.name}</span>
        </div>
      ))}

      {targetBox.show && (
        <div
          className="target-box"
          style={{ left: `${targetBox.x}%`, top: `${targetBox.y}%` }}
        >
          <ul>
            <li onClick={() => handleCharacterSelect('Magikarp')}>Magikarp</li>
            <li onClick={() => handleCharacterSelect('Weedle')}>Weedle</li>
            <li onClick={() => handleCharacterSelect('Seadra')}>Seadra</li>
            <li onClick={() => handleCharacterSelect('Magnemite')}>
              Magnemite
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Game;
