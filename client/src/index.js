import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/userContext";
import { CartContextProvider } from "./context/cartContext";

ReactDOM.render(
  <UserContextProvider>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </UserContextProvider>,
  document.getElementById("root")
);
