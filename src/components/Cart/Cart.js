import React, { useContext } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import { CartContext } from "../../context/cart-context";

export default function Cart(props) {
  const context = useContext(CartContext);

  const totalPrice = Object.entries(props.cartContent).reduce(
    (sum, [, value]) => sum + value.price * value.amount,
    0
  );
  return (
    <Modal>
      <div className={styles.cartItem}>
        {Object.entries(props.cartContent).map(([key, value]) => {
          return <CartItem key={key} id={key} item={value} />;
        })}
      </div>
      <div className={styles.total}>
        <div>Total Amount</div>
        <div>${totalPrice.toFixed(2)}</div>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={context.hideCart}>
          Close
        </button>
        <button className={styles.button} onClick={context.order}>
          Order
        </button>
      </div>
    </Modal>
  );
}
