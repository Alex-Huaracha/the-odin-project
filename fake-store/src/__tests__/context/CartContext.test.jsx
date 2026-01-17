import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider } from '../../context/Cart.provider';
import { useCartContext } from '../../context/Cart.context';

describe('CartContext', () => {
  it('adds item to cart', () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCartContext(), { wrapper });

    const product = { id: 1, title: 'Test', price: 10, image: 'url' };

    act(() => {
      result.current.addToCart(product, 2);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.totalItemsInCart).toBe(2);
    expect(result.current.totalPrice).toBe(20);
  });

  it('updates item quantity', () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCartContext(), { wrapper });

    const product = { id: 1, title: 'Test', price: 10, image: 'url' };

    act(() => {
      result.current.addToCart(product, 1);
      result.current.updateItemQuantity(1, 5);
    });

    expect(result.current.cartItems[0].quantity).toBe(5);
    expect(result.current.totalPrice).toBe(50);
  });

  it('removes item from cart', () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCartContext(), { wrapper });

    const product = { id: 1, title: 'Test', price: 10, image: 'url' };

    act(() => {
      result.current.addToCart(product, 1);
      result.current.removeItem(1);
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.totalItemsInCart).toBe(0);
  });
});
