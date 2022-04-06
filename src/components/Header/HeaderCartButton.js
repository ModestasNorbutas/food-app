import React from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";

export default function HeaderCartButton() {
  return (
    <button className={styles.button}>
      <div className={styles.icon}>
        <CartIcon />
      </div>
      <div>Your Cart</div>
      <div className={styles.badge}>{0}</div>
    </button>
  );
}
