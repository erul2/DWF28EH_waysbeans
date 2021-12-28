import { Card, Col } from "react-bootstrap";
import styles from "./productCard.module.css";
import toRupiah from "@develoka/angka-rupiah-js";

export default function ProductCard(props) {
  return (
    <Col className="mb-5">
      <Card onClick={props.onClick} className={` h-100`}>
        <Card.Img variant="top" src={props.photo} />
        <Card.Body className={styles.bg}>
          <div className={styles.name}>{props.name}</div>
          <div className={styles.price}>
            {"Rp." + toRupiah(props.price, { symbol: null, floatingPoint: 0 })}
          </div>
          <div className={styles.stock}>{"Stock : " + props.stock}</div>
        </Card.Body>
      </Card>
    </Col>
  );
}
