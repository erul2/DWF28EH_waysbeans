import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Navbar from "../components/navbar/navbar";
import styles from "./addProduct.module.css";
import Alert from "../components/modal/alert";
import MiniAlert from "../components/modal/miniAlert";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    name: "",
    stock: "",
    price: "",
    description: "",
    photo: "",
  });

  const [loading, setLoading] = useState({
    isLoading: false,
    error: false,
    message: "",
  });

  const addProduct = async (form) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("stock", form.stock);
      formData.set("price", form.price);
      formData.set("description", form.description);
      if (form.photo !== "")
        formData.set("photo", form.photo[0], form.photo[0].name);

      const response = await API.post("/product", formData, config);

      if (true) {
        setLoading({ isLoading: true });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      if (error.response) {
        setLoading({
          isLodaing: false,
          error: true,
          message: error.response.data.message,
        });
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const handleChange = (e) => {
    let newValue = "";
    if (e.target.type === "file") {
      newValue = e.target.files;
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    } else {
      newValue = e.target.value;
    }

    setForm({
      ...form,
      [e.target.name]: newValue,
    });
  };

  const handleSubmit = () => {
    setLoading({ ...loading, isLoading: true });
    addProduct(form);
  };

  return (
    <>
      <Navbar />
      <Container className="px-3">
        <Row className="px-lg-5 mb-5">
          <Col sm={12} md={6} className="mb-5">
            <h2 className={styles.title}>Add Product</h2>
            {loading.error ? <MiniAlert message={loading.message} /> : null}
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
                type="number"
                placeholder="Stock"
                value={form.stock}
                name="stock"
              />
              <input
                onChange={handleChange}
                className={styles.input}
                type="number"
                placeholder="Price"
                value={form.price}
                name="price"
              />
              <textarea
                onChange={handleChange}
                rows="3"
                className={styles.textarea}
                placeholder="Description Product"
                name="description"
                value={form.description}
              ></textarea>

              <label className={styles.attachment} htmlFor="photo">
                <span>Photo Product</span>
                <img
                  className={styles.attachIcon}
                  src="/icon/attach.svg"
                  alt=""
                />
              </label>
              <input
                id="photo"
                type="file"
                name="photo"
                hidden
                onChange={handleChange}
              />
            </form>
            <button className={styles.btnAdd} onClick={handleSubmit}>
              Add Product
            </button>
          </Col>
          <Col sm={12} md={6}>
            <img className={styles.photo} src={preview} alt="photo" />
          </Col>
        </Row>
      </Container>
      {loading.isLoading ? (
        <Alert message={loading.success ? "Success Add Product" : "Loading"} />
      ) : null}
    </>
  );
}
