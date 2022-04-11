import React, { useState, useEffect } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";
// import { CartContext } from "../../context/cart-context";
import { useSelector } from "react-redux";

export default function HeaderCartButton(props) {
  // const context = useContext(CartContext);
  const itemCount = useSelector((state) => state.cart.itemCount);
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
    <button className={styles.button + " " + bump} onClick={props.showCart}>
      <div className={styles.icon}>
        <CartIcon />
      </div>
      <div>Your Cart</div>
      <div className={styles.badge}>{itemCount}</div>
    </button>
  );
}
