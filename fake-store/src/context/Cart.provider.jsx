import { useReducer, useMemo } from 'react';
import { CartContext } from './Cart.context';

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItem = state.find((item) => item.id === product.id);

      if (existingItem) {
        return state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...state, { ...product, quantity }];
    }

    case 'UPDATE_QUANTITY': {
      const { productId, newQuantity } = action.payload;
      if (newQuantity <= 0) {
        return state.filter((item) => item.id !== productId);
      }

      return state.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    }

    case 'REMOVE_ITEM': {
      const { productId } = action.payload;
      return state.filter((item) => item.id !== productId);
    }

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product, quantity) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity },
    });
  };

  const updateItemQuantity = (productId, newQuantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, newQuantity },
    });
  };

  const removeItem = (productId) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { productId },
    });
  };

  const totalItemsInCart = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () =>
      parseFloat(
        cartItems
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2)
      ),
    [cartItems]
  );

  const value = {
    cartItems,
    addToCart,
    updateItemQuantity,
    removeItem,
    totalItemsInCart,
    totalPrice,
  };

  return <CartContext value={value}>{children}</CartContext>;
};
