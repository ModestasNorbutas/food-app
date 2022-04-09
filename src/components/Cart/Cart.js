import React, { useContext, useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import { CartContext } from "../../context/cart-context";
import OrderForm from "./OrderForm";

export default function Cart(props) {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const context = useContext(CartContext);

  const totalPrice = Object.values(props.cartContent).reduce(
    (sum, value) => sum + value.price * value.amount,
    0
  );

  const cartIsEmpty = Object.keys(props.cartContent).length === 0;

  const handleOrder = () => {
    setIsOrdering(true);
    setSubmitError(null);
  };

  const handleSubmit = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://food-app-85a0a-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userData: userData,
            orderedItems: props.cartContent,
          }),
        }
      );
      const data = await response.json();
      setOrderNumber(data.name);
      props.clearCart();
    } catch (error) {
      setSubmitError(error.message);
    }
    setIsSubmitting(false);
    setIsOrdering(false);
  };

  const cartEntries = (
    <>
      <div className={styles["cart-items"]}>
        {Object.entries(props.cartContent).map(([key, value]) => (
          <CartItem key={key} id={key} item={value} />
        ))}
      </div>
      <div className={styles.total}>
        <div>Total Amount</div>
        <div>${totalPrice.toFixed(2)}</div>
      </div>
    </>
  );

  const submittingMessage = <h2>Submitting...</h2>;
  const errorMessage = (
    <>
      <h2>Unable to order...</h2>
      <p>({submitError})</p>
    </>
  );
  const successMessage = (
    <>
      <h2>Order was successfully submitted</h2>
      <p>(Order number: {orderNumber})</p>
    </>
  );

  let content = cartEntries;
  if (isSubmitting) {
    content = submittingMessage;
  } else if (submitError) {
    content = errorMessage;
  } else if (orderNumber) {
    content = successMessage;
  }

  const cartActions = (
    <div className={styles.actions}>
      <button
        className={styles["button--alt"]}
        onClick={props.clearCart}
        disabled={cartIsEmpty}
      >
        Clear Cart
      </button>
      <button className={styles["button--alt"]} onClick={context.hideCart}>
        Close
      </button>
      <button
        className={styles.button}
        onClick={handleOrder}
        disabled={cartIsEmpty}
      >
        Order
      </button>
    </div>
  );

  return (
    <Modal>
      {content}
      {isOrdering ? <OrderForm handleSubmit={handleSubmit} /> : cartActions}
    </Modal>
  );
}
