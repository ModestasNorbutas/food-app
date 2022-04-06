import React from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import mealsData from "../DummyData/dummy-meals";
import MealItem from "./MealItem";

export default function AvailableMeals() {
  return (
    <Card className={styles.meals}>
      <ul>
        {mealsData.map((meal) => (
          <MealItem
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        ))}
      </ul>
    </Card>
  );
}
