const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  verify(req, res, next, false);
};

exports.authAdmin = (req, res, next) => {
  verify(req, res, next, true);
};

const verify = (req, res, next, admin) => {
  const authHeader = req.header("Authorization");

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Access Denied!" });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    // check user role if not admin send error
    if (admin && verified.role !== "admin") {
      return res.status(401).send({
        status: "failed",
        message: "Access Denied, You are not an Admin!",
      });
    }
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({
      message: "Invalid token",
    });
  }
};
