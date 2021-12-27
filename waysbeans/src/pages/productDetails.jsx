import { useState, useEffect, useContext } from "react";
import { API } from "../config/api";
import { useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Navbar from "../components/navbar/navbar";
import styles from "./productDetails.module.css";
import toRupiah from "@develoka/angka-rupiah-js";
import { CartContext } from "../context/cartContext";

export default function ProductDetails() {
  const id = useParams().id;
  const [product, setProduct] = useState(null);
  const [cart, cartDispatch] = useContext(CartContext);

  const getProductDetail = async () => {
    try {
      const response = await API.get(`/product/${id}`);
      setProduct(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addCart = () => {
    console.log(product);
    return cartDispatch({
      type: "ADD_ORDER",
      payload: {
        products: {
          id: product.id,
          qty: cart.products?.qty ? cart.products.qty + 1 : 1,
        },
      },
    });
  };

  useEffect(() => {
    getProductDetail(setProduct);
  }, []);

  return (
    <>
      <Navbar />
      <Container className="px-xs-1 px-xl-5">
        <Row
          xs={1}
          lg={2}
          className="px-xs-1 px-lg-5 mb-5 justify-content-center align-items-center "
        >
          <Col xs={8} lg={6} className="mb-5">
            <img
              className={styles.photo}
              src={product?.photo}
              alt="produt photo"
            />
          </Col>
          <Col className="mb-5">
            <div className={styles.details}>
              <h2 className={styles.name}>{product && product.name}</h2>
              <p className={styles.stock}>{`Stock : ${product?.stock}`}</p>
              <div className={styles.descriptionContainer}>
                <p className={styles.description}>{product?.description}</p>
              </div>
              <p className={styles.price}>
                {product
                  ? "Rp." +
                    toRupiah(product.price, {
                      symbol: null,
                      floatingPoint: 0,
                    })
                  : null}
              </p>
              <button onClick={addCart} className={styles.btnCart}>
                Add Cart
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
