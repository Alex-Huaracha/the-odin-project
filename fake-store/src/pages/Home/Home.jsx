import { Link } from 'react-router';
import styles from './Home.module.css';

export const Home = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Welcome to FakeStore</h1>
        <p>Discover the latest in fashion and electronics</p>
        <Link to="/shop" className={styles.ctaButton}>
          Start Shopping
        </Link>
      </section>

      <section className={styles.categories}>
        <h2>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          <div className={styles.categoryCard}>
            <h3>Men's Clothing</h3>
          </div>
          <div className={styles.categoryCard}>
            <h3>Women's Clothing</h3>
          </div>
          <div className={styles.categoryCard}>
            <h3>Jewelry</h3>
          </div>
          <div className={styles.categoryCard}>
            <h3>Electronics</h3>
          </div>
        </div>
      </section>
    </div>
  );
};
