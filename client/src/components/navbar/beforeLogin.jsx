import styles from "./beforeLogin.module.css";

export default function BeforeLogin(props) {
  return (
    <>
      <button
        className={styles.btnLogin}
        onClick={() => props.setModal({ show: true, type: "LOGIN" })}
      >
        Login
      </button>
      <button
        className={styles.btnRegister}
        onClick={() => props.setModal({ show: true, type: "REGISTER" })}
      >
        Register
      </button>
    </>
  );
}
