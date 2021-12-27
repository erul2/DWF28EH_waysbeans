import { Modal, Row, Col, Table } from "react-bootstrap";
import OrderCard from "../orderCard";
import styles from "./transactionDetails.module.css";
import { API } from "../../config/api";

export function TransactionDetails({ show, hide, trx, reload }) {
  const approve = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        status: "Order success",
      });

      await API.patch(`/transaction/${trx.id}`, body, config);
      await reload();
      hide();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal centered size="lg" show={show} onHide={hide}>
      <Modal.Header closeButton>
        {/* <Modal.Title>{"Transactions " + (details.id + 1)}</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <Row lg={2} xs={1}>
          <Col>
            <Table bordered hover>
              <thead>
                <tr>
                  <th colSpan={2} className={styles.title}>
                    Shipping Detail
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tbBody}>
                <tr>
                  <td>Name</td>
                  <td>{trx.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{trx.email}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{trx.phone}</td>
                </tr>
                <tr>
                  <td>Pos Code</td>
                  <td>{trx.posCode}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{trx.address}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col>
            <OrderCard
              product={{
                name: trx.products[0].name,
                photo: trx.products[0].photo,
                date: trx.date,
                price: trx.products[0].price,
                qty: trx.products[0].orderQuantity,
              }}
              status={trx.status}
            />
            {trx.status === "On the way" ? (
              <button className={styles.btnApprove} onClick={approve}>
                Finnish Order
              </button>
            ) : null}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
