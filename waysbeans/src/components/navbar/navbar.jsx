import { useContext } from "react";
import { Navbar as BNavbar, Container, Nav } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import AfterLogin from "./afterLogin";
import BeforeLogin from "./beforeLogin";

export default function Navbar(props) {
  const [state, disptch] = useContext(UserContext);

  return (
    <BNavbar expand="md" className="shadow mb-5">
      <Container>
        <a href="/" className={`text-decoration-none`}>
          <img alt="Home" src="/icon/navLogo.svg" style={{ width: "163px" }} />
        </a>
        <BNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"></Nav>
          {state.isLogin ? (
            <AfterLogin />
          ) : (
            <BeforeLogin setModal={props.setModal} />
          )}
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
}
