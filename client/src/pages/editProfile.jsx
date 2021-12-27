import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import Navbar from "../components/navbar/navbar";
import { Container, Row, Col, Modal } from "react-bootstrap";
import styles from "./editProfile.module.css";
import MiniAlert from "../components/modal/miniAlert";
import Alert from "../components/modal/alert";

function EditProfile() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  document.title = "Edit Profile";
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    photo: "",
  });

  const [loading, setLoading] = useState({
    isLoading: false,
    error: false,
    message: "",
  });

  const editProfile = async (form) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set("fullName", form.fullName);
      formData.set("email", form.email);
      if (form.photo !== "") {
        formData.set("photo", form.photo[0], form.photo[0].name);
      }

      const response = await API.patch(`/user`, formData, config);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          ...response.data.data.users,
          token: localStorage.getItem("token"),
        },
      });
      console.log(response);
      setTimeout(() => navigate("/profile"), 2000);
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
    editProfile(form);
  };

  useEffect(() => {
    setForm({
      fullName: state.user.fullName,
      email: state.user.email,
      photo: "",
    });
    setPreview(state.user.photo);
  }, [state]);

  return (
    <>
      <Navbar />
      <Container className="px-3">
        <Row className="px-lg-5 mb-5">
          <Col sm={12} md={6} className="mb-5">
            <h2 className={styles.title}>Edit Profile</h2>
            {loading.error ? <MiniAlert message={loading.message} /> : null}
            <form className={styles.form}>
              <input
                onChange={handleChange}
                className={styles.input}
                type="text"
                placeholder="Full Name"
                value={form.fullName}
                name="fullName"
              />

              <input
                onChange={handleChange}
                className={styles.input}
                type="email"
                placeholder="Email"
                value={form.email}
                name="email"
              />

              <label className={styles.attachment} htmlFor="photo">
                <span>Photo Profile</span>
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
              Submit
            </button>
          </Col>
          <Col
            sm={12}
            md={6}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            {preview ? (
              <img className={styles.photo} src={preview} alt="photo" />
            ) : (
              <img
                className={styles.photo}
                src="/img/avatar/user-default.png"
                alt="photo"
              />
            )}
          </Col>
        </Row>
      </Container>
      {loading.isLoading ? (
        <Alert message={loading.success ? "Success Add Product" : "Loading"} />
      ) : null}
    </>
  );
}

export default EditProfile;
