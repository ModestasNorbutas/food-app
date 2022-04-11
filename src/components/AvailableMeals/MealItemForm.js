import React, { useState } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../UI/Input";
// import { CartContext } from "../../context/cart-context";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/index";

export default function MealItemForm(props) {
  // const context = useContext(CartContext);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);

  function changeAmount(event) {
    setAmount(+event.target.value);
  }

  function handleAdd(event) {
    event.preventDefault();
    // context.addToCart(props.item, amount);
    dispatch(cartActions.addToCart({ item: props.item, amount: amount }));
  }

  return (
    <form className={styles.form}>
      <Input
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "999",
        }}
        value={amount}
        onChange={changeAmount}
      />
      <button className={styles.button} onClick={handleAdd}>
        +Add
      </button>
    </form>
  );
}
