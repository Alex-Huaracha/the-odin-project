import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Navbar } from '../../components/Navbar/Navbar';
import { CartProvider } from '../../context/Cart.provider';

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Navbar />
        </CartProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('does not show badge when cart is empty', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Navbar />
        </CartProvider>
      </BrowserRouter>
    );

    const badge = screen.queryByText(/^\d+$/);
    expect(badge).not.toBeInTheDocument();
  });
});
