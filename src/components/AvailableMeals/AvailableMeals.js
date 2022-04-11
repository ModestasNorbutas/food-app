import React, { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

export default function AvailableMeals() {
  const context = useContext(CartContext);

  let infoMessage;
  if (context.isLoading) {
    infoMessage = <h2>"Loading..."</h2>;
  } else if (context.mealsError) {
    infoMessage = (
      <>
        <h2>Unable to load data...</h2> <p>({context.mealsError})</p>
      </>
    );
  } else if (context.mealsData.length === 0) {
    infoMessage = <h2>Something went wrong...</h2>;
  }

  return (
    <Card className={styles.meals}>
      {context.mealsData.length > 0 && (
        <ul>
          {context.mealsData.map((meal) => (
            <MealItem key={meal.id} item={meal} />
          ))}
        </ul>
      )}
      {infoMessage || ""}
    </Card>
  );
}
