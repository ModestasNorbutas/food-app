import React, { useRef, useState } from "react";
import styles from "./OrderForm.module.css";

const isValid = (...values) => {
  return values.every((value) => value.trim() !== "");
};

export default function OrderForm(props) {
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const [isFormValid, setIsFormValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    if (isValid(name, street, postal, city)) {
      props.handleSubmit({
        name,
        street,
        postalCode: postal,
        city,
      });
    } else {
      setIsFormValid({
        name: isValid(name),
        street: isValid(street),
        postal: isValid(postal),
        city: isValid(city),
      });
    }
  };

  const handleBlur = (event) => {
    setIsFormValid((prevState) => ({
      ...prevState,
      [event.target.name]: isValid(event.target.value),
    }));
  };

  const handleFocus = (event) => {
    setIsFormValid((prevState) => ({
      ...prevState,
      [event.target.name]: true,
    }));
  };

  const validStyles = (isValid) =>
    isValid ? styles.control : styles.control + " " + styles.invalid;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={validStyles(isFormValid.name)}>
        <label htmlFor="name">Name*</label>
        <input
          ref={nameRef}
          id="name"
          name="name"
          type="text"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>
      <div className={validStyles(isFormValid.street)}>
        <label htmlFor="street">Street*</label>
        <input
          ref={streetRef}
          id="street"
          name="street"
          type="text"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>
      <div className={validStyles(isFormValid.postal)}>
        <label htmlFor="postal">Postal Code*</label>
        <input
          ref={postalRef}
          id="postal"
          name="postal"
          type="text"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>
      <div className={validStyles(isFormValid.city)}>
        <label htmlFor="city">City*</label>
        <input
          ref={cityRef}
          id="city"
          name="city"
          type="text"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.hideCart}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
}
