import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

export default function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={styles.modal}>{props.children}</div>
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
}
