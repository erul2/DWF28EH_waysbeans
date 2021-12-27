import { createContext, useReducer } from "react";

// Cart context, to save order data
export const CartContext = createContext();

const initialState = {
  status: null,
  id: null,
  details: null,
  products: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_ORDER":
      const addOrder = { ...state, products: payload.products };

      localStorage.setItem("cart", JSON.stringify(addOrder));

      return { ...addOrder };

    // case "UPDATE_ORDER":
    //   localStorage.setItem(
    //     "cart",
    //     JSON.stringify({
    //       ...state,
    //       orders: payload.orders,
    //     })
    //   );

    //   return {
    //     ...state,
    //     orders: payload.orders,
    //   };

    case "INCREMENT":
      const increment = {
        ...state,
        products: {
          ...state.products,
          qty: state.products.qty + 1,
        },
      };

      localStorage.setItem("cart", JSON.stringify(increment));

      return { ...increment };

    case "DECREMENT":
      const decrement = {
        ...state,
        products: {
          ...state.products,
          qty:
            state.products.qty > 1
              ? state.products.qty - 1
              : state.products.qty,
        },
      };

      localStorage.setItem("cart", JSON.stringify(decrement));

      return { ...decrement };

    case "RELOAD_CART":
      if (localStorage.cart) {
        const cart = JSON.parse(localStorage.getItem("cart"));
        return { ...cart };
      }

      return { ...state };

    case "UPDATE_STATUS":
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...state,
          id: payload.id,
          details: payload.details,
          status: payload.status,
        })
      );

      return {
        ...state,
        id: payload.id,
        details: payload.details,
        status: payload.status,
      };

    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return {
        status: null,
        id: null,
        details: null,
        products: {},
      };

    default:
      throw new Error();
  }
};

export const CartContextProvider = ({ children }) => {
  const [cart, cartDispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={[cart, cartDispatch]}>
      {children}
    </CartContext.Provider>
  );
};
