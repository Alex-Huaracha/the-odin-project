import { useState, useEffect } from 'react';
import gameImage from './assets/game-image.webp';
import './App.css';

function App() {
  const [targetBox, setTargetBox] = useState({ show: false, x: 0, y: 0 });
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [username, setUsername] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const totalCharacters = 4;
  const characters = ['Magikarp', 'Weedle', 'Seadra', 'Magnemite'];

  useEffect(() => {
    if (startTime && !gameFinished) {
      const interval = setInterval(() => {
        const now = Date.now();
        setCurrentTime(Math.floor((now - startTime) / 1000));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [startTime, gameFinished]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/scores`);
      const data = await response.json();
      setLeaderboard(data);
      setShowLeaderboard(true);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const submitScore = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, time: finalTime }),
    });
    setGameFinished(false);
    fetchLeaderboard();
  };

  const handleImageClick = (e) => {
    if (gameFinished) return;

    if (startTime === null) {
      setStartTime(Date.now());
    }

    if (feedback) setFeedback(null);
    const { offsetX, offsetY } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = e.target;
    const relativeX = (offsetX / offsetWidth) * 100;
    const relativeY = (offsetY / offsetHeight) * 100;
    setTargetBox({ show: !targetBox.show, x: relativeX, y: relativeY });
  };

  const handleCharacterSelect = async (characterName) => {
    if (foundCharacters.some((char) => char.name === characterName)) {
      setFeedback({
        type: 'error',
        text: `Already found ${characterName}!`,
      });
      setTargetBox({ ...targetBox, show: false });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/validate`, {
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
        const newFoundCharacters = [
          ...foundCharacters,
          { name: characterName, x: targetBox.x, y: targetBox.y },
        ];
        setFoundCharacters(newFoundCharacters);

        if (newFoundCharacters.length === totalCharacters && startTime) {
          setFinalTime(currentTime);
          setGameFinished(true);
        }
      } else {
        setFeedback({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error(error);
    }
    setTargetBox({ ...targetBox, show: false });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMenuPosition = () => {
    const { x, y } = targetBox;
    let position = {};

    if (x > 85) {
      position.right = '0';
      position.left = 'auto';
      position.transform = 'translateX(0)';
    } else if (x < 15) {
      position.left = '0';
      position.right = 'auto';
      position.transform = 'translateX(0)';
    } else {
      position.left = '50%';
      position.transform = 'translateX(-50%)';
    }

    if (y < 20) {
      position.top = '40px';
    } else if (y > 80) {
      position.bottom = '40px';
      position.top = 'auto';
    } else {
      position.top = '40px';
    }

    return position;
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Find the Pokémon</h1>

        <div className="character-list">
          {characters.map((char) => (
            <div
              key={char}
              className={`character-badge ${
                foundCharacters.some((f) => f.name === char) ? 'found' : ''
              }`}
            >
              <img
                src={`/${char.toLowerCase()}.png`}
                alt={char}
                className="character-image"
              />
              <span className="character-name">{char}</span>
            </div>
          ))}
        </div>

        <div className="timer">
          <span className="timer-icon">⏱</span>
          <span className="timer-value">{formatTime(currentTime)}</span>
          <button className="btn-leaderboard" onClick={fetchLeaderboard}>
            🏆 High Scores
          </button>
        </div>
      </header>

      <main className="main">
        <div className="game-container">
          {feedback && (
            <div className={`feedback ${feedback.type}`}>{feedback.text}</div>
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
              className="marker"
              style={{ left: `${char.x}%`, top: `${char.y}%` }}
            >
              <div className="marker-pulse"></div>
            </div>
          ))}

          {targetBox.show && (
            <div
              className="target-box"
              style={{ left: `${targetBox.x}%`, top: `${targetBox.y}%` }}
            >
              <div className="target-circle"></div>
              <div className="character-menu" style={getMenuPosition()}>
                {characters.map((char) => (
                  <button
                    key={char}
                    className="character-option"
                    onClick={() => handleCharacterSelect(char)}
                    disabled={foundCharacters.some((f) => f.name === char)}
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {gameFinished && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-title">Victory! 🎉</h2>
            <p className="modal-time">
              Time: <strong>{formatTime(finalTime)}</strong>
            </p>
            <form className="modal-form" onSubmit={submitScore}>
              <input
                type="text"
                className="modal-input"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
              <button type="submit" className="modal-button">
                Save Score
              </button>
            </form>
          </div>
        </div>
      )}

      {showLeaderboard && (
        <div
          className="modal-overlay"
          onClick={() => setShowLeaderboard(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Hall of Fame</h2>

            <div className="leaderboard-list">
              {leaderboard.length > 0 ? (
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Time</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((score, index) => (
                      <tr
                        key={score.id}
                        className={index < 3 ? `rank-${index + 1}` : ''}
                      >
                        <td>{index + 1}</td>
                        <td>{score.username}</td>
                        <td>{formatTime(score.time)}</td>
                        <td>{new Date(score.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No scores yet. Be the first!</p>
              )}
            </div>

            <button
              className="modal-button secondary"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
