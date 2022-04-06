import React from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

export default function AvailableMeals(props) {
  return (
    <Card className={styles.meals}>
      {props.mealsData.length > 0 && (
        <ul>
          {props.mealsData.map((meal) => (
            <MealItem key={meal.id} item={meal} />
          ))}
        </ul>
      )}
      {props.mealsData.length <= 0 && (
        <div>Waiting for data from server...</div>
      )}
    </Card>
  );
}
