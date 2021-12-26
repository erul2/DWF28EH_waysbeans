import styles from "./hero.module.css";
import { Container, Row, Col } from "react-bootstrap";

export default function Hero() {
  return (
    <Container fluid className="p-0 m-0 mb-5">
      <Container fluid className="p-0">
        <Row className="position-relative p-0 m-0">
          <Col className={`${styles.content} ps-5 pt-4 pt-xl-5`}>
            <Col xs={7}>
              <img className={styles.logo} src="/icon/logoicon.svg" alt="" />
            </Col>
            <Row xs={2}>
              <Col className="mb-4">
                <h3 className={styles.title}>BEST QUALITY COFFEE BEANS</h3>
                <p className={styles.desc}>
                  Quality freshly roasted coffee made just for you.
                  <br /> Pour, brew and enjoy
                </p>
              </Col>
              <Col className="pe-5 align-self-end">
                <img className={styles.waves} src="/icon/waves.svg" />
              </Col>
            </Row>
          </Col>
          <Col xs={8} lg={5} className={styles.imageContainer}>
            <img className={styles.image} src="/img/hero.png" />
          </Col>
        </Row>
      </Container>
    </Container>
    // <div className={styles.hero}>
    //   <Container fluid className="p-0 position-relative">
    //     <div className={styles.content}>
    //       <img className={styles.logo} src="/icon/logoicon.svg" alt="" />
    //       <h3 className={styles.title}>BEST QUALITY COFFEE BEANS</h3>
    //       <p className={styles.desc}>
    //         Quality freshly roasted coffee made just for you.
    //         <br /> Pour, brew and enjoy
    //       </p>
    //     </div>
    //     <img className={styles.image} src="/img/hero.png" />
    //   </Container>
    // </div>
  );
}
