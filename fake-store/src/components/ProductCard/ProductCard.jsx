import { useState } from 'react';
import styles from './ProductCard.module.css';

export const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <article className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} />
      </div>

      <div className={styles.productInfo}>
        <h3>{product.title}</h3>
        <p className={styles.price}>${product.price}</p>

        <div className={styles.actions}>
          <div className={styles.quantityControl}>
            <button onClick={handleDecrement}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
            <button onClick={handleIncrement}>+</button>
          </div>
          <button onClick={handleAddToCart} className={styles.addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};
