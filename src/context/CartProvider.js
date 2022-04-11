import React, { useState, useReducer, useEffect } from "react";
import { CartContext } from "./cart-context";

// const cartReducer = (state, action) => {
//   if (action.type === "ADD") {
//     return {
//       ...state,
//       [action.item.id]: {
//         name: action.item.name,
//         price: action.item.price,
//         amount: (state[action.item.id]?.amount || 0) + action.amount,
//       },
//     };
//   }
//   if (action.type === "INCREASE") {
//     return {
//       ...state,
//       [action.id]: {
//         ...state[action.id],
//         amount: state[action.id].amount + 1,
//       },
//     };
//   }
//   if (action.type === "DECREASE") {
//     if (state[action.id].amount > 1) {
//       return {
//         ...state,
//         [action.id]: {
//           ...state[action.id],
//           amount: state[action.id].amount - 1,
//         },
//       };
//     } else {
//       const { [action.id]: _, ...otherItems } = state;
//       return {
//         ...otherItems,
//       };
//     }
//   }
//   if (action.type === "CLEAR") {
//     return {};
//   }
// };

export default function CartProvider(props) {
  const [mealsData, setMealsData] = useState([]);
  // const [itemCount, setItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mealsError, setMealsError] = useState(null);
  // const [cartContent, editCartContent] = useReducer(cartReducer, {});

  // useEffect(() => {
  //   let count = Object.entries(cartContent).reduce(
  //     (sum, [, value]) => sum + value.amount,
  //     0
  //   );
  //   setItemCount(count);
  // }, [cartContent]);

  // function addToCart(item, amount) {
  //   editCartContent({
  //     type: "ADD",
  //     item: item,
  //     amount: amount,
  //   });
  // }

  // function increaseCartItem(id) {
  //   editCartContent({
  //     type: "INCREASE",
  //     id: id,
  //   });
  // }

  // function decreaseCartItem(id) {
  //   editCartContent({
  //     type: "DECREASE",
  //     id: id,
  //   });
  // }

  // function clearCart() {
  //   editCartContent({ type: "CLEAR" });
  // }

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://food-app-85a0a-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
        );

        const data = await response.json();

        const loadedMeals = [];

        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMealsData(loadedMeals);
      } catch (error) {
        setMealsError(error.message);
      }
    };
    fetchMeals();
    setIsLoading(false);
  }, []);

  return (
    <CartContext.Provider
      value={{
        mealsData,
        isLoading,
        mealsError,
        // cartContent,
        // itemCount,
        // addToCart,
        // increaseCartItem,
        // decreaseCartItem,
        // clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
