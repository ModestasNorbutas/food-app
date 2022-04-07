import React, { useState, useContext } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../UI/Input";
import { CartContext } from "../../context/cart-context";

export default function MealItemForm(props) {
  const context = useContext(CartContext);
  const [amount, setAmount] = useState(1);

  function changeAmount(event) {
    setAmount(+event.target.value);
  }

  function handleAdd(event) {
    event.preventDefault();
    context.addToCart(props.item, amount);
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
