import React from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";

export default function Cart() {
  return (
    <Modal>
      <div className={styles.cartItem}>
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <div className={styles.total}>
        <div>Total Amount</div>
        <div>$99.99</div>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]}>Close</button>
        <button className={styles["button--alt"]}>Order</button>
      </div>
    </Modal>
  );
}
