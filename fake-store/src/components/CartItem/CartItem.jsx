import styles from './CartItem.module.css';

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      onUpdateQuantity(item.id, value);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <article className={styles.cartItem}>
      <div className={styles.itemImage}>
        <img src={item.image} alt={item.title} />
      </div>

      <div className={styles.itemDetails}>
        <h3>{item.title}</h3>
        <p className={styles.itemPrice}>${item.price}</p>
      </div>

      <div className={styles.itemActions}>
        <div className={styles.quantityControl}>
          <button onClick={handleDecrement}>-</button>
          <input
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            min="1"
          />
          <button onClick={handleIncrement}>+</button>
        </div>
        <button onClick={handleRemove} className={styles.removeButton}>
          Remove
        </button>
      </div>

      <div className={styles.itemTotal}>
        <span>${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </article>
  );
};
