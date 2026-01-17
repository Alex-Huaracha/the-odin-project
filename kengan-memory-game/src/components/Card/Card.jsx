import { useState, useEffect } from 'react';
import './Card.css';
import cardBackImage from '../../assets/images/card-back.webp';

export default function Card({ card, onCardClick, isShuffling }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isShuffling) {
      setIsFlipped(true);
      const timer = setTimeout(() => {
        setIsFlipped(false);
      }, 1200);

      return () => clearTimeout(timer);
    } else {
      setIsFlipped(false);
    }
  }, [isShuffling]);
  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => !isShuffling && onCardClick(card.id)}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={card.image} alt={card.name} />
          <p>{card.name}</p>
        </div>

        <div className="card-back">
          <img src={cardBackImage} alt="Card back" />
        </div>
      </div>
    </div>
  );
}
