import { useState, useEffect } from 'react';
import './App.css';
import { shuffleArray } from './utils/shuffleArray';
import Card from './components/Card/Card';
import Modal from './components/Modal/Modal';
import logo from './assets/images/logo.png';

// Kengan Ashura ID : 40269
const ANIME_ID = 40269;

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    type: '',
    title: '',
    message: '',
  });

  useEffect(() => {
    const fetchKenganCharacters = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${ANIME_ID}/characters`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch Kengan Ashura characters');
        }

        const data = await response.json();

        const formattedCards = data.data.map((item) => ({
          id: item.character.mal_id,
          name: item.character.name,
          image: item.character.images.jpg.image_url,
        }));

        const randomCards = shuffleArray(formattedCards).slice(0, 12);
        setCards(randomCards);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const savedBestScore = localStorage.getItem('bestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }

    fetchKenganCharacters();
  }, []);

  const handleCardClick = (cardId) => {
    if (clickedCards.includes(cardId)) {
      setModal({
        isOpen: true,
        type: 'game-over',
        title: 'Game Over!',
        message: `You clicked the same character twice. Final Score: ${score}`,
      });
      return;
    }

    const newScore = score + 1;
    setScore(newScore);
    setClickedCards([...clickedCards, cardId]);

    if (newScore > bestScore) {
      setBestScore(newScore);
      localStorage.setItem('bestScore', newScore);
    }

    if (newScore === cards.length) {
      setModal({
        isOpen: true,
        type: 'victory',
        title: 'Victory!',
        message: `Perfect score! You found all ${cards.length} characters!`,
      });
      return;
    }

    setIsShuffling(true);
    setTimeout(() => {
      setCards(shuffleArray(cards));
      setIsShuffling(false);
    }, 1200);
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
    resetGame();
  };

  const resetGame = () => {
    setScore(0);
    setClickedCards([]);
    setIsShuffling(true);

    setTimeout(() => {
      setCards(shuffleArray(cards));
      setIsShuffling(false);
    }, 600);
  };

  if (loading) {
    return <div className="loading">Loading Characters...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <>
      {/* Header */}
      <header>
        <h1 className="title">Memory Card</h1>
        <img className="logo" src={logo} alt="Logo" />
        {/* Scoreboard */}
        <div className="scoreboard">
          <p>Best Score: {bestScore}</p>
          <p>Score: {score}</p>
        </div>
      </header>
      {/* Main Content - Card Grid*/}
      <main className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onCardClick={handleCardClick}
            isShuffling={isShuffling}
          />
        ))}
      </main>
      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
      {/* Footer */}
      <footer>
        &copy; 2025 Designed and developed by
        <a
          href="https://github.com/Alex-Huaracha"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <svg className="icon" aria-hidden="true">
            <use href="#icon-github"></use>
          </svg>
          Alex Huaracha
        </a>
      </footer>
    </>
  );
}

export default App;
