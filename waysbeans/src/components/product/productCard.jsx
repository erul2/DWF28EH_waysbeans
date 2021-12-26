import { Card, Col } from "react-bootstrap";
import styles from "./productCard.module.css";

export default function ProductCard(props) {
  return (
    <Col className="mb-5">
      <Card onClick={props.onClick} className={` h-100`}>
        <Card.Img variant="top" src={props.photo} />
        <Card.Body className={styles.bg}>
          <div className={styles.name}>{props.name}</div>
          <div className={styles.price}>{props.price}</div>
          <div className={styles.stock}>{"Stock : " + props.stock}</div>
        </Card.Body>
      </Card>
    </Col>
  );
}
