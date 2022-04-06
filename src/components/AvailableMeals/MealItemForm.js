import React from "react";
import styles from "./MealItemForm.module.css";
import Input from "./Input";

export default function MealItemForm() {
  return (
    <form className={styles.form}>
      <Input />
      <button className={styles.button}>+Add</button>
    </form>
  );
}
