import { useState, useEffect } from "react";
import { Row, Col, CardGroup } from "react-bootstrap";
import ProductCard from "./productCard";
import { API } from "../../config/api";
import styles from "./productList.module.css";

export default function () {
  const [products, setProducts] = useState(null);

  const getProducts = async (setProducts) => {
    try {
      const response = await API.get("/products");
      setProducts(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts(setProducts);
  }, []);

  return (
    <div className={styles.container}>
      <CardGroup>
        <Row xs={1} md={2} lg={4}>
          {products
            ? products.map((item, index) => (
                <ProductCard
                  key={index}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  stock={item.stock}
                  photo={item.photo}
                />
              ))
            : null}
        </Row>
      </CardGroup>
    </div>
  );
}
