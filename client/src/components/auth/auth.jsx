import { useState, useContext, useEffect } from "react";
import { login } from "../../config/api/auth";
import { Modal, Form } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import MiniAlert from "../modal/miniAlert";
import styles from "./auth.module.css";

export default function Auth(props) {
  const [loading, setLoading] = useState({
    isLoading: false,
    success: false,
    error: false,
    message: "",
  });
  const [message, setMessage] = useState(null);
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    login(
      props.type,
      form,
      dispatch,
      () => {
        props.close();
        navigate("/");
      },
      (error) => {
        setLoading({
          isLodaing: false,
          success: false,
          error: true,
          message: error,
        });
      }
    );

    // try {
    //   e.preventDefault();
    //   // configuration
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   const loginData =
    //     props.type === "LOGIN"
    //       ? { email: form.email, password: form.password }
    //       : form;
    //   // data Body
    //   const body = JSON.stringify(loginData);
    //   // insert data login proccess
    //   const response = await API.post(
    //     props.type === "LOGIN" ? "/login" : "/register",
    //     body,
    //     config
    //   );
    //   if (response?.status === 200) {
    //     const payload = response.data.data;
    //     // send data to useContext
    //     payload.token = response.data.data.user.token;
    //     dispatch({
    //       type: "LOGIN_SUCCESS",
    //       payload,
    //     });
    //   }
    //   props.close();
    //   navigate("/");
    // } catch (error) {
    //   if (error.response) {
    //     setLoading({
    //       isLodaing: false,
    //       success: false,
    //       error: true,
    //       message: error.response.data.message,
    //     });
    //   } else if (error.request) {
    //     console.log(error.request);
    //   } else {
    //     console.log("Error", error.message);
    //   }
    //   console.log(error.config);
    // }
  };

  useEffect(() => {
    setLoading({ isLoading: false, error: false, message: "" });
  }, [props.type]);

  return (
    <Modal
      dialogClassName="modal-login"
      show={props.show}
      onHide={props.close}
      centered
    >
      <Modal.Body className={styles.modalBody}>
        <div className={styles.modalTitle}>
          {props.type === "LOGIN" ? "Login" : "Register"}
        </div>
        {message && message}
        <Form onSubmit={handleOnSubmit} className={styles.form}>
          {loading.error ? <MiniAlert message={loading.message} /> : null}
          <Form.Control
            onChange={handleOnChange}
            type="text"
            placeholder="Email"
            value={form.email}
            name="email"
            className={styles.modalInput}
          />

          <Form.Control
            onChange={handleOnChange}
            type="password"
            placeholder="Password"
            className="modalInput"
            value={form.password}
            name="password"
            className={styles.modalInput}
          />

          {props.type === "REGISTER" ? (
            <Form.Control
              onChange={handleOnChange}
              type="text"
              placeholder="Full Name"
              className="modalInput"
              value={form.fullName}
              name="fullName"
              className={styles.modalInput}
            />
          ) : null}
          <button type="submit" className={styles.modalBtn}>
            {props.type === "LOGIN" ? "Login" : "Register"}
          </button>
          <p className={styles.modalDesc}>
            Don't have an account ? Click{" "}
            <span className={styles.switch} onClick={props.switch}>
              Here
            </span>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
