import { useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { CartContext } from "./context/cartContext";
import { setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";
import { checkUser } from "./config/api/user";
import Routes from "./router";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [cart, cartDispatch] = useContext(CartContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser(dispatch);
      cartDispatch({ type: "RELOAD_CART" });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
