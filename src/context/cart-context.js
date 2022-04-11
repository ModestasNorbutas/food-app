import { createContext } from "react";

export const CartContext = createContext({
  mealsData: [],
  isLoading: null,
  mealsError: null,
  cartContent: {},
  itemCount: 0,
  addToCart: () => {},
  increaseCartItem: () => {},
  decreaseCartItem: () => {},
  clearCart: () => {},
});
