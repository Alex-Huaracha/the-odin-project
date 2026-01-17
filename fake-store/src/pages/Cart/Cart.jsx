import { useCartContext } from '../../context/Cart.context';
import { CartItem } from '../../components/';
import styles from './Cart.module.css';

export const Cart = () => {
  const {
    cartItems,
    totalItemsInCart,
    totalPrice,
    updateItemQuantity,
    removeItem,
  } = useCartContext();

  if (totalItemsInCart === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started</p>
        <a href="/shop" className={styles.shopButton}>
          Browse Products
        </a>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Shopping Cart</h1>
        <p>
          {totalItemsInCart} {totalItemsInCart === 1 ? 'item' : 'items'}
        </p>
      </header>

      <div className={styles.cartContent}>
        <div className={styles.itemsList}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateItemQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        <div className={styles.summary}>
          <h2>Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${totalPrice}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
          <button className={styles.checkoutButton}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};
