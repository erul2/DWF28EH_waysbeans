import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import Navbar from "../components/navbar/navbar";
import { API } from "../config/api";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import styles from "./Profile.module.css";
import OrderCard from "../components/orderCard";
import { TransactionDetails } from "../components/modal/transactionDetails";

export default function Profile() {
  const [state, dispatch] = useContext(UserContext);
  const [user, setUser] = useState({
    id: "",
    fullName: "WaysBeans",
    email: "waysbeans@mail.com",
    photo: "",
  });
  document.title = "WaysBeans - Profile - " + user.fullName;
  const [trx, setTrx] = useState(null);
  const [details, setDetails] = useState({ show: false, index: 0, id: 0 });

  const getTrx = async () => {
    try {
      const response = await API.get("/my-transactions");
      setTrx(response.data.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await API.get(`/user/${state.user.id}`);
      setUser(response.data.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const complete = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        status: "Order success",
      });

      await API.patch(`/transaction/${id}`, body, config);
      getTrx();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (state.user.id) {
      getUser();
      getTrx();
    }
  }, [state.user?.id]);

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
                      user.photo ? user.photo : "/img/avatar/user-default.png"
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
                  <div className={styles.value}>{user.fullName}</div>
                </div>
                <div className={styles.dataGroup}>
                  <div className={styles.dataTitle}>Email</div>
                  <div className={styles.value}>{user.email}</div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <h2 className={styles.title}>My Transactions</h2>
            {trx?.length > 0 ? (
              trx.map((item, index) => (
                <OrderCard
                  onClick={() => setDetails({ show: true, index, id: item.id })}
                  key={index}
                  product={{
                    name: item.products[0].name,
                    photo: item.products[0].photo,
                    date: item.date,
                    price: item.products[0].price,
                    qty: item.products[0].orderQuantity,
                  }}
                  status={item.status}
                  complete={() => complete(item.id)}
                />
              ))
            ) : (
              <h4>No transaction yet</h4>
            )}
          </Col>
        </Row>
        {details.show ? (
          <TransactionDetails
            show={details.show}
            hide={() => setDetails({ ...details, show: false })}
            trx={trx[details.index]}
            reload={getTrx}
          />
        ) : null}
      </Container>
    </>
  );
}
