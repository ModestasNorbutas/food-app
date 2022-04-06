import React from "react";
import styles from "./Input.module.css";

export default function Input(props) {
  return (
    <div className={styles.input}>
      <label>Amount</label>
      <input
        value={props.value}
        onChange={props.onChange}
        min="1"
        max="999"
        type="number"
      />
    </div>
  );
}
