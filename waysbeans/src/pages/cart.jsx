import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OrderList from "../components/OrderList";
import { API } from "../config/api";
import styles from "./cart.module.css";
import { convert as rupiah } from "rupiah-format";
import { UserContext } from "../context/userContext";
import { CartContext } from "../context/cartContext";
import Navbar from "../components/navbar/navbar";
import { Container, Row, Col } from "react-bootstrap";
import Alert from "../components/modal/alert";

function CartOrder() {
  document.title = "WaysFood - Cart Order";
  const [alert, setAlert] = useState({
    show: false,
    message: "",
  });
  const navigate = useNavigate();

  const [cart, cartDispatch] = useContext(CartContext);
  const [product, setProduct] = useState({});

  const getProduct = async () => {
    try {
      const response = await API.get("/product/" + cart.products.id);
      setProduct(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    setAlert({ show: true, message: "Tidak ada product di cart" });
    setTimeout(() => navigate("/"), 3000);
  };

  useEffect(() => {
    if (cart.products.id) {
      getProduct();
    } else {
      goBack();
    }
  }, []);

  useEffect(() => {
    if (!cart.products?.id) goBack();
  }, [cart]);

  return (
    <>
      <Navbar />
      <Container className="px-xs-1 px-xl-5">
        <Container className="px-xs-1 px-lg-5 mb-5 justify-content-flex-center align-items-strat">
          {cart.products?.id ? (
            <>
              <h2 className={styles.title}>My Cart</h2>
              <Row>
                <span className={styles.description}>Review Your Order</span>
                <Col xs={12} md={8} className="pe-0 pe-md-4 mb-4">
                  <div className={styles.divider} />
                  <OrderList
                    add={() => cartDispatch({ type: "INCREMENT" })}
                    sub={() => cartDispatch({ type: "DECREMENT" })}
                    del={() => cartDispatch({ type: "CLEAR_CART" })}
                    img={product?.photo}
                    name={product?.name}
                    qty={cart.products.qty}
                    price={product?.price}
                    id={product?.id}
                  />
                </Col>
                <Col xs={12} md={4} className={`${styles.divider} py-3 px-0`}>
                  <table className={styles.table}>
                    <tbody>
                      <tr>
                        <td className={styles.text}>Subtotal</td>
                        <td className={styles.right}>20000</td>
                      </tr>
                      <tr>
                        <td className={`${styles.text} pb-3`}>Qty</td>
                        <td className={styles.right}>20000</td>
                      </tr>
                      <tr className={styles.dividerGroup}>
                        <td className={styles.divider} />
                        <td className={styles.divider} />
                      </tr>
                      <tr>
                        <td className={styles.textTotal}>Total</td>
                        <td className={styles.textTotalRight}>20000</td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    className={styles.btn}
                    onClick={() => navigate("/shipping")}
                  >
                    Procced To Checkout
                  </button>
                </Col>
              </Row>
            </>
          ) : null}
        </Container>
      </Container>
      {alert.show ? <Alert danger message={alert.message} /> : null}
    </>
  );
}

export default CartOrder;
