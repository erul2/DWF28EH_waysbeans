const express = require("express");
const router = require("./src/routes");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/", router);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
