import React from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

export default function AvailableMeals(props) {
  let infoMessage;
  if (props.isLoading) {
    infoMessage = <h2>"Loading..."</h2>;
  } else if (props.mealsError) {
    infoMessage = (
      <>
        <h2>Unable to load data...</h2> <p>({props.mealsError})</p>
      </>
    );
  } else if (props.mealsData.length === 0) {
    infoMessage = <h2>Something went wrong...</h2>;
  }

  return (
    <Card className={styles.meals}>
      {props.mealsData.length > 0 && (
        <ul>
          {props.mealsData.map((meal) => (
            <MealItem key={meal.id} item={meal} />
          ))}
        </ul>
      )}
      {infoMessage || ""}
    </Card>
  );
}
