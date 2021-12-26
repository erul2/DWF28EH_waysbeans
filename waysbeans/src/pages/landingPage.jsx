import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import Navbar from "../components/navbar/navbar";
import Auth from "../components/auth/auth";
import ProductsList from "../components/product/producsList";
import Hero from "../components/hero";

export default function LandingPage() {
  const [state, dispatch] = useContext(UserContext);
  const [modal, setModal] = useState({
    show: false,
    type: "",
  });
  useEffect(() => console.log(state), [state]);

  return (
    <>
      <Navbar isLogin={state.isLogin} setModal={setModal} />
      <Hero />
      <ProductsList />

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
    </>
  );
}
