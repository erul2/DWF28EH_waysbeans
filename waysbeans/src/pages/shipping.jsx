import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/cartContext";
import { Row, Col, Container } from "react-bootstrap";
import Navbar from "../components/navbar/navbar";
import styles from "./shipping.module.css";
import OrderCard from "../components/orderCard";
import { API } from "../config/api";
import Alert from "../components/modal/alert";
import { useNavigate } from "react-router-dom";

export default function Shipping() {
  const navigate = useNavigate();
  const [cart, cartDispatch] = useContext(CartContext);
  const [product, setProduct] = useState({});
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [loading, setLoading] = useState({ isLoading: false, error: null });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    posCode: "",
    address: "",
    attachment: [],
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    console.log(e.target.type);
  };

  const handleSubmit = async (e) => {
    setLoading({ ...loading, isLoading: true });
    if (form.attachment.length === 0)
      return setLoading({
        setLoading: false,
        message: "Please attach proof of transaction",
      });
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("posCode", form.posCode);
      formData.set("address", form.address);
      formData.set("attachment", form.attachment[0], form.attachment[0].name);
      formData.set(
        "products",
        JSON.stringify([
          { id: cart.products.id, orderQuantity: cart.products.qty },
        ])
      );
      console.log(form);

      await API.post("/transaction", formData, config);

      setAlert({
        show: true,
        message:
          "Thank you for ordering us, please wait 1 x 24 hours to verify your order",
      });

      setTimeout(() => {
        navigate("/profile");
        cartDispatch({ type: "CLEAR_CART" });
      }, 3000);
    } catch (error) {
      if (error.response) {
        setLoading({ isLodaing: false, message: error.response.data.message });
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const getProduct = async () => {
    try {
      const response = await API.get("/product/" + cart.products.id);
      setProduct(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cart.products.id) getProduct();
  }, [cart]);

  return (
    <>
      <Navbar />
      <Container className={`${styles.container} px-5`}>
        <Row className="px-5">
          <Col>
            <h2 className={styles.title}>Shipping</h2>
            <div>{loading.message}</div>
            <form className={styles.form}>
              <input
                onChange={handleChange}
                className={styles.input}
                type="text"
                placeholder="Name"
                value={form.name}
                name="name"
              />
              <input
                onChange={handleChange}
                className={styles.input}
                type="email"
                placeholder="Email"
                value={form.email}
                name="email"
              />
              <input
                onChange={handleChange}
                className={styles.input}
                type="number"
                placeholder="Phone"
                value={form.phone}
                name="phone"
              />
              <input
                onChange={handleChange}
                className={styles.input}
                type="number"
                placeholder="Pos Code"
                value={form.posCode}
                name="posCode"
              />
              <textarea
                onChange={handleChange}
                rows="3"
                className={styles.textarea}
                placeholder="Address"
                name="address"
                value={form.address}
              ></textarea>

              <label className={styles.attachment} htmlFor="attachment">
                <span>Attache of transaction</span>
                <img
                  className={styles.attachIcon}
                  src="/icon/attach.svg"
                  alt=""
                />
              </label>
              <input
                id="attachment"
                type="file"
                name="attachment"
                hidden
                onChange={handleChange}
              />
            </form>
          </Col>
          <Col>
            <OrderCard
              product={{
                photo: product?.photo,
                name: product?.name,
                date: ["sunday", "22 dec 2021"],
                price: product?.price,
                qty: cart.products.qty,
                subTotal: 600,
              }}
            />
            <button onClick={handleSubmit} className={styles.btnPay}>
              Pay
            </button>
          </Col>
        </Row>
      </Container>

      {alert.show ? <Alert message={alert.message} /> : null}
    </>
  );
}
