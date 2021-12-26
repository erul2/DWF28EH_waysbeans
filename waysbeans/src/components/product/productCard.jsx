import { Col, Card } from "react-bootstrap";

export default function ProductCard(props) {
  return (
    <Col>
      <a href={`/product/${props.id}`}>
        <Card>
          <Card.Img variant="top" src={props.photo} />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <p>{props.price}</p>
            <p>{props.stock}</p>
          </Card.Body>
        </Card>
      </a>
    </Col>
  );
}
