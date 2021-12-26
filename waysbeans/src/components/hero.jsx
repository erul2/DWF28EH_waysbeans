import styles from "./hero.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <img className={styles.logo} src="/icon/logoicon.svg" alt="" />
          <h3 className={styles.title}>BEST QUALITY COFFEE BEANS</h3>
          <p className={styles.desc}>
            Quality freshly roasted coffee made just for you. Pour, brew and
            enjoy
          </p>
        </div>
        <img className={styles.image} src="/img/hero.png" />
      </div>
    </div>
  );
}
