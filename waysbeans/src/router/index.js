import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "../context/userContext";
import RequireAuth from "./requireAuth";
import LandingPage from "../pages/landingPage";
import ProductDetails from "../pages/productDetails";
import Profile from "../pages/profile";
import Cart from "../pages/cart";
import EditProfile from "../pages/editProfile";
import Shipping from "../pages/shipping";
import IncomeTransactions from "../pages/incomeTransactions";
import AddProduct from "../pages/addProduct";

import { Navigate } from "react-router-dom";

export default function Router() {
  const [state, dispatch] = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            state.user?.email === "admin@waysbeans.com" ? (
              <IncomeTransactions />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route
          path="/add-product"
          element={
            <RequireAuth>
              <AddProduct />
            </RequireAuth>
          }
        />
        <Route
          path="/product/:id"
          element={
            <RequireAuth>
              <ProductDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route
          path="/shipping"
          element={
            <RequireAuth>
              <Shipping />
            </RequireAuth>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <RequireAuth>
              <EditProfile />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
