import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/cartContext";
import { Row, Col, Container, Modal } from "react-bootstrap";
import Navbar from "../components/navbar/navbar";
import styles from "./shipping.module.css";
import OrderCard from "../components/orderCard";
import { API } from "../config/api";
import MiniAlert from "../components/modal/miniAlert";
import Alert from "../components/modal/alert";
import { useNavigate } from "react-router-dom";

export default function Shipping() {
  document.title = "WaysBeans - Shipping";
  const navigate = useNavigate();
  const [cart, cartDispatch] = useContext(CartContext);
  const [product, setProduct] = useState({});
  const [alert, setAlert] = useState({
    show: false,
    message: "",
  });
  const [loading, setLoading] = useState({ isLoading: false, error: null });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    posCode: "",
    address: "",
    attachment: [],
  });
  const [preview, setPreview] = useState({ show: false, url: "" });

  const handleChange = (e) => {
    let value = "";

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview({ ...preview, url });
      value = e.target.files;
    } else {
      value = e.target.value;
    }

    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading({ ...loading, isLoading: true });
    if (form.attachment.length === 0)
      return setLoading({
        setLoading: false,
        error: "Please attach proof of transaction",
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
      }, 4000);
    } catch (error) {
      if (error.response) {
        setLoading({
          isLodaing: false,
          error: error.response.data.message,
        });
      } else if (error.request) {
        console.log(error.request);
      } else {
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
      <Container className="px-xs-1 px-xl-5">
        <Container className="px-xs-1 px-lg-5 mb-5">
          <Row>
            <Col>
              <h2 className={styles.title}>Shipping</h2>
              {loading.error ? <MiniAlert message={loading.error} /> : null}
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
                <div className="d-flex">
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
                  {preview.url ? (
                    <img
                      src={preview.url}
                      className={styles.preview}
                      alt="preview"
                      onClick={() => setPreview({ ...preview, show: true })}
                    />
                  ) : null}
                </div>
              </form>
            </Col>
            <Col>
              {product.id ? (
                <OrderCard
                  product={{
                    photo: product?.photo,
                    name: product?.name,
                    date: new Date(),
                    price: product?.price,
                    qty: cart.products.qty,
                    subTotal: 600,
                  }}
                />
              ) : null}

              <button onClick={handleSubmit} className={styles.btnPay}>
                Pay
              </button>
            </Col>
          </Row>
        </Container>
      </Container>
      {preview.show ? (
        <Modal
          size="sm"
          show={preview.show}
          onHide={() => setPreview({ ...preview, show: false })}
          centered
        >
          <Modal.Body>
            <img src={preview.url} alt="Preview" style={{ width: "100%" }} />
          </Modal.Body>
        </Modal>
      ) : null}
      {alert.show ? <Alert message={alert.message} /> : null}
    </>
  );
}
