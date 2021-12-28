import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import Navbar from "../components/navbar/navbar";
import { API } from "../config/api";
import styles from "./incomeTransactions.module.css";

export default function IncomeTransactions() {
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async (set) => {
    try {
      const response = await API.get("/transactions");

      set(response.data.data.transactions);
    } catch (error) {
      if (error.response) {
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const editTransaction = async (id, type) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        status: type === "APPROVE" ? "On the way" : "Cancel",
      });

      await API.patch(`/transaction/${id}`, body, config);

      getTransactions(setTransactions);
    } catch (error) {
      if (error.response) {
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  useEffect(() => {
    getTransactions(setTransactions);
  }, []);

  return (
    <>
      <Navbar />
      <Container className="px-3">
        <div className="px-lg-5 mb-5">
          <h2 className={styles.title}>Income Transactions</h2>
          {transactions.length > 0 ? (
            <Table responsive bordered hover>
              <tbody className={styles.tbBody}>
                <tr className={styles.tbHeader}>
                  <th>No</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th className={styles.postCode}>Post Code</th>
                  <th>Product Order</th>
                  <th>Status</th>
                  <th className={`text-center`}>Action</th>
                </tr>
                {transactions?.map((item, i) => {
                  let status = (
                    <span className={styles.waiting}>Waiting Approve</span>
                  );
                  let action = (
                    <>
                      <button
                        className={styles.btnCancel}
                        onClick={() => editTransaction(item.id, "CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        className={styles.btnApprove}
                        onClick={() => editTransaction(item.id, "APPROVE")}
                      >
                        Approve
                      </button>
                    </>
                  );

                  switch (item.status) {
                    case "Order success":
                      action = <img src="/icon/success.svg" alt="" />;
                      status = <span className={styles.success}>Success</span>;
                      break;
                    case "On the way":
                      action = <img src="/icon/success.svg" alt="" />;
                      status = (
                        <span className={styles.onTheWay}>On The Way</span>
                      );
                      break;
                    case "Cancel":
                      status = <span className={styles.cancel}>Cancel</span>;
                      action = <img src="/icon/cancel.svg" alt="" />;
                      break;
                    default:
                      console.log("error");
                  }

                  return (
                    <tr key={i} className={styles.tbRow}>
                      <td>{i + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item.address}</td>
                      <td>{item?.postCode || 9112}</td>
                      <td>{item?.products[0]?.name}</td>
                      <td>{status}</td>
                      <td className={styles.actionRow}>
                        <div className={styles.actionContainer}>{action}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <Container className="d-flex align-items-center justify-content-center mt-5 pt-5">
              <h4>No Transactions yet</h4>
            </Container>
          )}
        </div>
      </Container>
    </>
  );
}
