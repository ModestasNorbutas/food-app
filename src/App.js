import React, { useState, useEffect, useReducer } from "react";
import Header from "./components/Header/Header";
import MealsSummary from "./components/MealsSummary/MealsSummary";
import AvailableMeals from "./components/AvailableMeals/AvailableMeals";
import Cart from "./components/Cart/Cart";
import { CartContext } from "./context/cart-context";
import DUMMY_MEALS from "./components/DummyData/dummy-meals";

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    return {
      ...state,
      [action.item.id]: {
        name: action.item.name,
        price: action.item.price,
        amount: (state[action.item.id]?.amount || 0) + action.amount,
      },
    };
  }
  if (action.type === "INCREASE") {
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        amount: state[action.id].amount + 1,
      },
    };
  }
  if (action.type === "DECREASE") {
    if (state[action.id].amount > 1) {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          amount: state[action.id].amount - 1,
        },
      };
    } else {
      const { [action.id]: _, ...otherItems } = state;
      return {
        ...otherItems,
      };
    }
  }
};

export default function App() {
  const [mealsData, setMealsData] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartContent, editCartContent] = useReducer(cartReducer, {});
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setMealsData(DUMMY_MEALS);
  }, []);

  useEffect(() => {
    let count = Object.entries(cartContent).reduce(
      (sum, [, value]) => sum + value.amount,
      0
    );
    setItemCount(count);
  }, [cartContent]);

  function showCart() {
    setIsCartVisible(true);
  }

  function hideCart() {
    setIsCartVisible(false);
  }

  function addToCart(item, amount) {
    editCartContent({
      type: "ADD",
      item: item,
      amount: amount,
    });
  }

  function increaseCartItem(id) {
    editCartContent({
      type: "INCREASE",
      id: id,
    });
  }

  function decreaseCartItem(id) {
    editCartContent({
      type: "DECREASE",
      id: id,
    });
  }

  function order() {
    console.log("Ordering...");
  }

  return (
    <CartContext.Provider
      value={{
        mealsData: mealsData,
        showCart: showCart,
        hideCart: hideCart,
        addToCart: addToCart,
        increaseCartItem: increaseCartItem,
        decreaseCartItem: decreaseCartItem,
        order: order,
      }}
    >
      <Header itemCount={itemCount} />
      <MealsSummary />
      <AvailableMeals mealsData={mealsData} />
      {isCartVisible && (
        <Cart cartContent={cartContent} isCartVisible={isCartVisible} />
      )}
    </CartContext.Provider>
  );
}
