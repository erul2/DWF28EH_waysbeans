const { Users } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login Controller
exports.login = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    // do validation
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    // get user data
    const user = await Users.findOne({
      where: { email: req.body.email },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!user) {
      return res.status(400).send({
        status: "failed",
        message: "Email or Password is invalid",
      });
    }

    const { id, email, password } = user;

    // password validation
    const isValid = await bcrypt.compare(req.body.password, password);

    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "Email or Password is invalid",
      });
    }

    // user role
    const role = email === "admin@waysbean.com" ? "admin" : "user";

    // generate token
    const token = jwt.sign(
      {
        id,
        role,
      },
      process.env.TOKEN_KEY
    );

    res.send({
      status: "success",
      data: {
        user: {
          email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

// Register Controller
exports.register = async (req, res) => {
  // validation schema
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    fullName: Joi.string().min(3).required(),
  });

  // do validation
  const { error } = schema.validate(req.body);

  // if error send validation error message
  if (error) {
    return res.status(400).send({
      status: "failed",
      message: error.details[0].message,
    });
  }

  try {
    // check if email aleready exists
    const userExist = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExist) {
      return res.status(400).send({
        status: "failed",
        message: "User already exists",
      });
    }

    // generate salt
    const salt = await bcrypt.genSalt(5);
    // hashing password from request body
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await Users.create({
      ...req.body,
      password: hashedPassword,
    });

    // user role
    const role = req.body.email === "admin@waysbean.com" ? "admin" : "user";

    // generate token
    const token = jwt.sign(
      {
        id: newUser.id,
        role,
      },
      process.env.TOKEN_KEY
    );

    res.status(200).send({
      status: "success",
      data: {
        user: {
          email: newUser.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
