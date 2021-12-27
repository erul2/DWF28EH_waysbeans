import { useState } from "react";
import { Alert } from "react-bootstrap";

export default function MiniAlert(props) {
  const [show, setShow] = useState(true);

  return (
    <Alert show={show} variant="danger">
      {props.message}
    </Alert>
  );
}
