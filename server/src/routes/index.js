const express = require("express");
const router = express.Router();

// Controllers
const { login, register } = require("../controllers/auth");

const { getUser, editUser, checkUser } = require("../controllers/user");

const {
  addProduct,
  getProducts,
  getProduct,
} = require("../controllers/product");

const {
  addTransaction,
  editTransaction,
  getTransactions,
  getMyTransactions,
} = require("../controllers/transaction");

// Middlewares
const { auth, authAdmin } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

// Routes
router.post("/login", login);

router.post("/register", register);

router.get("/user/:id", auth, getUser);

router.get("/checkUser", auth, checkUser);

router.patch("/user", auth, uploadFile("photo"), editUser);

router.get("/products", getProducts);

router.get("/product/:productId", getProduct);

router.post("/product", authAdmin, uploadFile("photo"), addProduct);

router.get("/transactions", authAdmin, getTransactions);

router.get("/my-transactions", auth, getMyTransactions);

router.post("/transaction", auth, uploadFile("attachment"), addTransaction);

router.patch("/transaction/:transactionId", auth, editTransaction);

module.exports = router;
