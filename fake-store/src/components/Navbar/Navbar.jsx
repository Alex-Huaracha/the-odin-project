import { NavLink } from 'react-router';
import { useCartContext } from '../../context/Cart.context';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const { totalItemsInCart } = useCartContext();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>Fake Store</h1>
        <svg className={styles.icon}>
          <use href="#icon-logo"></use>
        </svg>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Cart
            {totalItemsInCart > 0 && (
              <span className={styles.badge}>{totalItemsInCart}</span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
