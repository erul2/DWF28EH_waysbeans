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

  const handleSubmit = async () => {
    // const products = cart.orders.map((menu) => {
    //   return {
    //     id: menu.id,
    //     qty: menu.qty,
    //   };
    // });
    // const body = JSON.stringify({
    //   deliveryAddress: location,
    //   resto: cart.seller.id,
    //   products,
    // });
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // const response = await API.post("/transaction", body, config);
    // const data = response.data.data.transaction;
    // cartDispatch({
    //   type: "UPDATE_STATUS",
    //   payload: {
    //     id: data.id,
    //     status: data.status,
    //   },
    // });
    // sendNotif({
    //   id: data.id,
    // });
  };

  const handleFinishOrder = async () => {
    // try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   const body = JSON.stringify({
    //     status: "Order success",
    //   });
    //   await API.put(`/transaction/${cart.id}`, body, config);
    //   cartDispatch({
    //     type: "CLEAR_CART",
    //   });
    //   sendNotif({
    //     id: cart.id,
    //   });
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <Navbar />
      <Container className="px-xs-1 px-md-3 px-xl-5">
        <Container className="mt-5 pb-5">
          {cart.products?.id ? (
            <>
              <h4 className="subtitle mb-4">My Cart</h4>
              <Row>
                <span className={styles.description}>Review Your Order</span>
                <Col xs={12} md={8}>
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
                        <td>Subtotal</td>
                        <td className={styles.right}>20000</td>
                      </tr>
                      <tr>
                        <td>Qty</td>
                        <td className={`${styles.qty}`}>20000</td>
                      </tr>
                      <tr>
                        <td>Shipping Cost</td>
                        <td className={styles.right}>15000</td>
                      </tr>
                      <tr className={styles.dividerGroup}>
                        <td className={styles.divider} />
                        <td className={styles.divider} />
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td className={styles.right}>20000</td>
                      </tr>
                    </tbody>
                  </table>
                  <button onClick={() => navigate("/shipping")}>
                    Procced To Checkout
                  </button>
                </Col>
              </Row>
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
              <h2 className="mt-5">
                Let's order delicious food at the best restaurant
              </h2>
            </div>
          )}
        </Container>
      </Container>
      <Alert
        show={alert.show}
        danger
        hide={() => setAlert({ show: false, message: "" })}
        message={alert.message}
      />
    </>
  );
}

export default CartOrder;
