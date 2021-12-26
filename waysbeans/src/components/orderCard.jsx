import styles from "./orderCard.module.css";

export default function OrderCard(props) {
  const product = props.product;
  let statusStyle = styles.waitingApprove;
  let status = "Waiting Approve";
  switch (props.status) {
    case "On the way":
      status = "On The Way";
      statusStyle = styles.onTheWay;
    case "Cancel":
      status = "Cancel";
      statusStyle = styles.cacel;
    case "Order success":
      status = "Success";
      statusStyle = styles.success;
  }

  return (
    <div className={styles.container}>
      <img className={styles.photo} src={product.photo} alt="photo" />
      <div className={styles.details}>
        <h3 className={styles.name}>{product.name}</h3>
        <span className={styles.day}>{product.date[0] + ", "}</span>
        <span className={styles.date}>{product.date[1]}</span>
        <div className={styles.priceContainer}>
          <div className={styles.price}>{"Price : " + product.price}</div>
          <div className={styles.price}>{`Qty : ${product.qty}`}</div>
          <div className={styles.subTotal}>
            {"Sub Total : " + product.qty * product.price}
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
            <img className={styles.qrcode} src="/icon/qrcode.svg" alt="qr" />
            <div className={statusStyle}>{status}</div>
          </>
        ) : null}
      </div>
    </div>
  );
}