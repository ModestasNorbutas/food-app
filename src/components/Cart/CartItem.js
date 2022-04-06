import React from "react";
import styles from "./CartItem.module.css";

export default function CartItem(props) {
  return (
    <div className={styles["cart-item"]}>
      <div>
        <h2>Sushi</h2>
        <div className={styles.summary}>
          <div className={styles.price}>$22.99</div>
          <div className={styles.amount}>x1</div>
        </div>
      </div>
      <div className={styles.actions}>
        <button>-</button>
        <button>+</button>
      </div>
    </div>
  );
}
