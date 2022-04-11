// import React, { useContext } from "react";
// import { CartContext } from "../../context/cart-context";
import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/index";

export default function CartItem(props) {
  // const context = useContext(CartContext);
  const dispatch = useDispatch();

  function handleIncrease() {
    // context.increaseCartItem(props.id);
    dispatch(cartActions.increase(props.id));
  }

  function handleDecrease() {
    // context.decreaseCartItem(props.id);
    dispatch(cartActions.decrease(props.id));
  }

  return (
    <div className={styles["cart-item"]}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={styles.summary}>
          <div className={styles.price}>${props.item.price.toFixed(2)}</div>
          <div className={styles.amount}>x{props.item.amount}</div>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={handleDecrease}>-</button>
        <button onClick={handleIncrease}>+</button>
      </div>
    </div>
  );
}
