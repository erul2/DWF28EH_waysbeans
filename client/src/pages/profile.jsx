import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import Navbar from "../components/navbar/navbar";
import { API } from "../config/api";
import { Link } from "react-router-dom";
import { Container, Col, Row, Modal, Table } from "react-bootstrap";
import styles from "./Profile.module.css";
import OrderCard from "../components/orderCard";

export default function Profile() {
  const [state, dispatch] = useContext(UserContext);
  document.title = "WaysBeans - Profile - " + state.user.fullName;
  const [trx, setTrx] = useState(null);
  const [details, setDetails] = useState({ show: false, index: 0, id: 0 });

  const getTrx = async () => {
    try {
      const response = await API.get("/my-transactions");
      setTrx(response.data.data.transactions);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const accOrderComplete = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        status: "Order success",
      });

      const response = await API.patch(`/transaction/${id}`, body, config);
      getTrx();
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
                        : "/img/avatar/user-default.png"
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
                />
              ))
            ) : (
              <h4>No transaction yet</h4>
            )}
          </Col>
        </Row>
        {details.show ? (
          <Modal
            centered
            size="lg"
            show={details.show}
            onHide={() => setDetails({ ...details, show: false })}
          >
            <Modal.Header closeButton>
              {/* <Modal.Title>{"Transactions " + (details.id + 1)}</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              <Row lg={2} xs={1}>
                <Col>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th colSpan={2}>Shipping Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{trx[details?.index].name}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{trx[details?.index].email}</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>{trx[details?.index].phone}</td>
                      </tr>
                      <tr>
                        <td>Pos Code</td>
                        <td>{trx[details?.index].posCode}</td>
                      </tr>
                      <tr>
                        <td>Address</td>
                        <td>{trx[details?.index].address}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col>
                  <OrderCard
                    product={{
                      name: trx[details?.index].products[0].name,
                      photo: trx[details?.index].products[0].photo,
                      date: trx[details?.index].date,
                      price: trx[details?.index].products[0].price,
                      qty: trx[details?.index].products[0].orderQuantity,
                    }}
                    status={trx[details.index].status}
                  />
                  <button
                    className={styles.btnApprove}
                    onClick={() => accOrderComplete(details.id)}
                  >
                    Approve Order
                  </button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        ) : null}
      </Container>
    </>
  );
}
