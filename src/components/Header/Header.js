import React from "react";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import meals from "../../images/meals.jpg";

export default function Header(props) {
  return (
    <>
      <nav className={styles.header}>
        <h1>Food App</h1>
        <HeaderCartButton itemCount={props.itemCount} />
      </nav>
      <div className={styles["main-image"]}>
        <img src={meals} alt="meals" />
      </div>
    </>
  );
}
