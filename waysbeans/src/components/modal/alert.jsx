import { useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./alert.module.css";

export default function Alert(props) {
  const [show, setShow] = useState(true);
  return (
    <Modal centered size="lg" show={show}>
      <Modal.Body>
        <h4 className={props.danger ? styles.danger : styles.success}>
          {props.message}
        </h4>
      </Modal.Body>
    </Modal>
  );
}
