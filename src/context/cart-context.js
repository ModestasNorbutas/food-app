import { createContext } from "react";

export const CartContext = createContext({
  mealsData: [],
  showCart: () => {},
  hideCart: () => {},
  addToCart: () => {},
  increaseCartItem: () => {},
  decreaseCartItem: () => {},
  order: () => {},
});
