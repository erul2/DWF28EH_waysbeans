import logo from "./logo.svg";
import { useEffect, useContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./router";
import { CartContext } from "./context/cartContext";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [cart, cartDispatch] = useContext(CartContext);

  const checkUser = async (dispatch) => {
    try {
      const response = await API.get("/checkuser");

      const payload = response.data.data.users;
      // send data to useContext
      payload.token = localStorage.getItem("token");
      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "LOGOUT",
      });
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser(dispatch);
    }

    // cartDispatch({ type: "RELOAD_CART" });
  }, []);

  useEffect(() => {
    if (state.isLogin) {
      setAuthToken(localStorage.token);
      checkUser(dispatch);
      cartDispatch({ type: "RELOAD_CART" });
    }
  }, [state.isLogin]);

  return <Router />;
}

export default App;
