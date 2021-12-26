import { useState, useEffect, useContext } from "react";
import { Row, Col, CardGroup, Container } from "react-bootstrap";
import ProductCard from "./productCard";
import { API } from "../../config/api";
import styles from "./productList.module.css";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function (props) {
  const [products, setProducts] = useState(null);
  const [state] = useContext(UserContext);
  const navigate = useNavigate();

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
    <Row xs={2} md={3} lg={4}>
      {products
        ? products.map((item, index) => (
            <ProductCard
              key={index}
              onClick={() => {
                if (!state.isLogin) {
                  props.login();
                } else {
                  navigate("/product/" + item.id);
                }
              }}
              id={item.id}
              name={item.name}
              price={item.price}
              stock={item.stock}
              photo={item.photo}
            />
          ))
        : null}
    </Row>
  );
}
