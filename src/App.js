import React, { useState } from "react";
import Header from "./components/Header/Header";
import MealsSummary from "./components/MealsSummary/MealsSummary";
import AvailableMeals from "./components/AvailableMeals/AvailableMeals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./context/CartProvider";

export default function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  function showCart() {
    setIsCartVisible(true);
  }

  function hideCart() {
    setIsCartVisible(false);
  }

  return (
    <CartProvider>
      <Header showCart={showCart} />
      <MealsSummary />
      <AvailableMeals showCart={showCart} />
      {isCartVisible && <Cart hideCart={hideCart} />}
    </CartProvider>
  );
}
