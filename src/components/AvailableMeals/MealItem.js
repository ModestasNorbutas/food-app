import React from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

export default function MealItem(props) {
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={styles.description}>{props.item.description}</p>
        <div className={styles.price}>${props.item.price.toFixed(2)}</div>
      </div>
      <MealItemForm item={props.item} />
    </li>
  );
}
