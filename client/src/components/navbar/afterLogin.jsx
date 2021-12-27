import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import { CartContext } from "../../context/cartContext";
import styles from "./afterLogin.module.css";

export default function AfterLogin() {
  const [state, dispatch] = useContext(UserContext);
  const [cart, cartDispatch] = useContext(CartContext);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const navigate = useNavigate();
  return (
    <>
      {state.user.email !== "admin@waysbeans.com" ? (
        <Link to="/cart" className="position-relative me-2">
          <img
            src="/icon/shopping-basket.svg"
            alt="cart"
            style={{
              width: "35px",
              height: "35px",
            }}
          />{" "}
          <span
            className={`position-absolute translate-middle badge rounded-pill bg-danger ${styles.badge}`}
          >
            {cart.products?.qty}
          </span>
        </Link>
      ) : null}

      <NavDropdown
        title={
          <img
            src={
              state.user.image
                ? state.user.image
                : "/img/avatar/user-default.png"
            }
            alt="icon"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        }
        id="basic-nav-dropdown"
        align="end"
      >
        {state.user.email !== "admin@waysbeans.com" ? (
          <>
            <NavDropdown.Item
              href="/profile"
              className="dropdown-item my-3 d-flex align-items-center"
            >
              <img src="/icon/user.svg" width="30px" height="30px" alt="" />
              <span className={styles.dropdownItem}>Profile</span>
            </NavDropdown.Item>
          </>
        ) : (
          <NavDropdown.Item
            href="/add-product"
            className="dropdown-item my-3 d-flex align-items-center"
          >
            <img src="/icon/product.svg" width="30px" alt="" />
            <span className={styles.dropdownItem}>Add Product</span>
          </NavDropdown.Item>
        )}
        <NavDropdown.Divider />
        <NavDropdown.Item
          onClick={() => {
            dispatch({
              type: "LOGOUT",
            });
            cartDispatch({
              type: "CLEAR_CART",
            });
            navigate("/");
          }}
        >
          <img src="/icon/logout.svg" width="30px" alt="" />
          <span className={styles.dropdownItem}>Logout</span>
        </NavDropdown.Item>{" "}
      </NavDropdown>
    </>
  );
}
