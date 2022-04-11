import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: {}, itemCount: 0, totalPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      state.items[action.payload.item.id] = {
        name: action.payload.item.name,
        price: action.payload.item.price,
        amount:
          (state.items[action.payload.item.id]?.amount || 0) +
          action.payload.amount,
      };
      state.itemCount += action.payload.amount;
      state.totalPrice += action.payload.amount * action.payload.item.price;
    },
    increase(state, action) {
      state.items[action.payload] = {
        ...state.items[action.payload],
        amount: state.items[action.payload].amount + 1,
      };
      state.itemCount++;
      state.totalPrice += state.items[action.payload].price;
    },
    decrease(state, action) {
      if (state.items[action.payload].amount > 1) {
        state.items[action.payload] = {
          ...state.items[action.payload],
          amount: state.items[action.payload].amount - 1,
        };
        state.itemCount--;
        state.totalPrice -= state.items[action.payload].price;
      } else {
        state.itemCount--;
        state.totalPrice -= state.items[action.payload].price;
        const { [action.payload]: _, ...otherItems } = state.items;
        state.items = { ...otherItems };
      }
    },
    clearCart() {
      return initialCartState;
    },
  },
});

const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

export const cartActions = cartSlice.actions;
export default store;
