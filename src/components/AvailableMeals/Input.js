import React from "react";
import styles from "./Input.module.css";

export default function Input() {
  return (
    <div className={styles.input}>
      <label>Amount</label>
      <input />
    </div>
  );
}
