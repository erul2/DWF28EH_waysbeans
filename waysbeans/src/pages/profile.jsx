import { useState, useContext, useEffect } from "react";
import { convert as rupiah } from "rupiah-format";
import { UserContext } from "../context/userContext";
import Navbar from "../components/navbar/navbar";
import { API } from "../config/api";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import styles from "./Profile.module.css";
import OrderCard from "../components/orderCard";

export default function Profile() {
  const [state, dispatch] = useContext(UserContext);
  const [trx, setTrx] = useState(null);

  const getTrx = async () => {
    try {
      const response = await API.get("/my-transactions");
      setTrx(response.data.data.transactions);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrx();
  }, [state.user]);

  return (
    <>
      <Navbar />
      <Container className="px-xs-1 px-xl-5">
        <Row
          xs={1}
          lg={2}
          className="px-xs-1 px-lg-5 mb-5 justify-content-flex-center align-items-strat"
        >
          <Col className="mb-sm-5 mb-lg-0">
            <h2 className={styles.title}>My Profile</h2>
            <div className="d-flex">
              <div className="d-flex flex-column">
                <Link to="/edit-profile" className="mbtn">
                  <img
                    className="mb-4"
                    src={
                      state.user.image
                        ? state.user.image
                        : "/img/avatar/default.png"
                    }
                    width="180px"
                    height="221px"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </Link>
              </div>
              <div className="ms-4">
                <div className={styles.dataGroup}>
                  <div className={styles.dataTitle}>Full Name</div>
                  <div className={styles.value}>{state.user.fullName}</div>
                </div>
                <div className={styles.dataGroup}>
                  <div className={styles.dataTitle}>Email</div>
                  <div className={styles.value}>{state.user.email}</div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <h2 className={styles.title}>My Transactions</h2>
            {trx?.length > 0 ? (
              trx.map((item, index) => (
                <OrderCard
                  key={index}
                  product={{
                    name: item.products[0].name,
                    photo: item.products[0].photo,
                    date: ["sunday", "202 02 2021"],
                    price: item.products[0].price,
                    qty: item.products[0].orderQuantity,
                  }}
                  status={item.status}
                />
              ))
            ) : (
              <h4>No transaction yet</h4>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
