import React, { useContext, useState, useEffect } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";
import { CartContext } from "../../context/cart-context";

export default function HeaderCartButton(props) {
  const context = useContext(CartContext);
  const [bump, setBump] = useState("");

  useEffect(() => {
    setBump(styles.bump);
    const timeout = setTimeout(() => {
      setBump("");
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [props.itemCount]);
  return (
    <button className={styles.button + " " + bump} onClick={context.showCart}>
      <div className={styles.icon}>
        <CartIcon />
      </div>
      <div>Your Cart</div>
      <div className={styles.badge}>{props.itemCount}</div>
    </button>
  );
}
