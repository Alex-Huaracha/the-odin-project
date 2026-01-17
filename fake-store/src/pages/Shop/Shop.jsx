import { useFetch } from '../../hooks/useFetch';
import { useCartContext } from '../../context/Cart.context';
import { ProductCard } from '../../components';
import styles from './Shop.module.css';

export const Shop = () => {
  const { addToCart } = useCartContext();

  const {
    data: products,
    loading,
    error,
  } = useFetch('https://fakestoreapi.com/products');

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Error loading products</p>
        <span>{error.message}</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Shop</h1>
        <p>{products?.length} products available</p>
      </header>

      <div className={styles.productGrid}>
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};
