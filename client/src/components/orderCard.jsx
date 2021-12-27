import styles from "./orderCard.module.css";
import toRupiah from "@develoka/angka-rupiah-js";
import QRcode from "react-qr-code";
import moment from "moment";

export default function OrderCard(props) {
  const product = props.product;
  let statusStyle = styles.waitingApprove;
  let status = "Waiting Approve";
  let date = {
    day: moment(product?.date && new Date(product.date)).format("dddd"),
    date: moment(product?.date && new Date(product.date)).format("D MMMM YYYY"),
  };

  switch (props.status) {
    case "On the way":
      status = "On The Way";
      statusStyle = styles.onTheWay;
      break;
    case "Cancel":
      status = "Cancel";
      statusStyle = styles.cacel;
      break;
    case "Order success":
      status = "Success";
      statusStyle = styles.success;
      break;
  }

  return (
    <div className={styles.container} onClick={props.onClick}>
      <img className={styles.photo} src={product.photo} alt="photo" />
      <div className={styles.details}>
        <h3 className={styles.name}>{product.name}</h3>
        <span className={styles.day}>{date.day + ", "}</span>
        <span className={styles.date}>{date.date}</span>
        <div className={styles.priceContainer}>
          <div className={styles.price}>
            {"Price : Rp." +
              toRupiah(product.price, { symbol: null, floatingPoint: 0 })}
          </div>
          <div className={styles.price}>{`Qty : ${product.qty}`}</div>
          <div className={styles.subTotal}>
            {"Sub Total : Rp." +
              toRupiah(product.qty * product.price, {
                symbol: null,
                floatingPoint: 0,
              })}
          </div>
        </div>
      </div>
      <div className={styles.logoContainer}>
        <img
          className={styles.logo}
          src="/icon/navLogo.svg"
          alt="product_photo"
        />
        {props.status ? (
          <>
            <QRcode bgColor="#00000000" size={50} value={status} />
            <div className={statusStyle}>{status}</div>
          </>
        ) : null}
      </div>
    </div>
  );
}
