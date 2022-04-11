import React, { useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
// import { CartContext } from "../../context/cart-context";
import OrderForm from "./OrderForm";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/index";

export default function Cart(props) {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  // const context = useContext(CartContext);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const itemCount = useSelector((state) => state.cart.itemCount);
  const cartIsEmpty = itemCount === 0;
  const cartContent = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // const totalPrice = Object.values(context.cartContent).reduce(
  //   (sum, value) => sum + value.price * value.amount,
  //   0
  // );

  // const cartIsEmpty = Object.keys(context.cartContent).length === 0;

  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  };

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
            orderedItems: cartContent,
          }),
        }
      );
      const data = await response.json();
      setOrderNumber(data.name);
      // context.clearCart();
      handleClearCart();
    } catch (error) {
      setSubmitError(error.message);
    }
    setIsSubmitting(false);
    setIsOrdering(false);
  };

  const cartEntries = (
    <>
      <div className={styles["cart-items"]}>
        {Object.entries(cartContent).map(([key, value]) => (
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

  return (
    <Modal>
      {content}
      {isOrdering ? (
        <OrderForm handleSubmit={handleSubmit} hideCart={props.hideCart} />
      ) : (
        <div className={styles.actions}>
          <button
            className={styles["button--alt"]}
            onClick={handleClearCart}
            disabled={cartIsEmpty}
          >
            Clear Cart
          </button>
          <button className={styles["button--alt"]} onClick={props.hideCart}>
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
      )}
    </Modal>
  );
}
