import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { Container } from "react-bootstrap";
import Navbar from "../components/navbar/navbar";
import Auth from "../components/auth/auth";
import ProductsList from "../components/product/producsList";
import Hero from "../components/hero";

export default function LandingPage() {
  document.title = "WaysBeans";
  const [state, dispatch] = useContext(UserContext);
  const [modal, setModal] = useState({
    show: false,
    type: "",
  });

  return (
    <>
      <Navbar isLogin={state.isLogin} setModal={setModal} />
      <Container className="px-xs-1 px-xl-5">
        <Container className="px-xs-1 px-lg-5 mb-5">
          <Hero />
          <ProductsList login={() => setModal({ show: true, type: "LOGIN" })} />

          {modal.show ? (
            <Auth
              show={modal.show}
              type={modal.type}
              close={() => setModal({ show: false, type: null })}
              switch={() =>
                setModal({
                  show: true,
                  type: modal.type === "LOGIN" ? "REGISTER" : "LOGIN",
                })
              }
            />
          ) : null}
        </Container>
      </Container>
    </>
  );
}
