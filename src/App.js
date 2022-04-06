import React from "react";
import Header from "./components/Header/Header";
import MealsSummary from "./components/MealsSummary/MealsSummary";
import AvailableMeals from "./components/AvailableMeals/AvailableMeals";
import Cart from "./components/Cart/Cart";

export default function App() {
  return (
    <>
      <Header />
      <MealsSummary />
      <AvailableMeals />
      <Cart />
    </>
  );
}
