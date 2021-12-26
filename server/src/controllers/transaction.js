const { Transactions, Users, Orders, Products } = require("../../models");
const Joi = require("joi");

// get all transactions controller
exports.getTransactions = async (req, res) => {
  try {
    // query transactions data
    const transactions = await Transactions.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "fullName", "email"],
        },
        {
          model: Products,
          through: {
            model: Orders,
            attributes: ["qty"],
          },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: { exclude: ["idUser", "updatedAt"] },
    });

    const data = transactions.map((item) => {
      const {
        id,
        user,
        name,
        email,
        phone,
        address,
        attachment,
        status,
        createdAt,
        posCode,
      } = item;

      const products = item.Products.map((product) => {
        const { id, name, price, description } = product;
        return {
          id,
          name,
          price,
          description,
          photo: process.env.UPLOADS + product.photo,
          orderQuantity: product.Orders.qty,
        };
      });

      return {
        id,
        user,
        name,
        email,
        phone,
        address,
        posCode,
        attachment: process.env.UPLOADS + attachment,
        status,
        products,
        date: createdAt,
      };
    });

    res.send({
      status: "success",
      data: {
        transactions: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Server Error" });
  }
};

// create new transaction
exports.addTransaction = async (req, res) => {
  const { name, email, phone, address, posCode } = req.body;
  const products = JSON.parse(req.body.products);

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    address: Joi.string().min(10).required(),
    phone: Joi.string().min(7).required(),
    posCode: Joi.number().required(),
    // attachment: Joi.string().required(),
    products: Joi.array().required(),
  });

  // do validation
  const { error } = schema.validate({
    name,
    email,
    address,
    phone,
    products,
    posCode,
  });
  const attachment = req.file ? req.file.filename : null;
  if (error || !attachment) {
    return res.status(400).send({
      status: "failed",
      message: !attachment
        ? "Please attach proof of payment"
        : error.details[0].message,
    });
  }

  try {
    //get buyer details
    const user = await Users.findOne({
      where: { id: req.user.id },
      attributes: ["id", "fullName", "email"],
    });

    const newTransaction = {
      idUser: user.id,
      name,
      email,
      phone,
      address,
      posCode,
      attachment,
      status: "Waiting approve",
    };

    // create new transaction
    const transaction = await Transactions.create(newTransaction);
    const transactionId = transaction.id;
    const productsData = products.map((item) => {
      return {
        qty: item.orderQuantity,
        idProduct: item.id,
        idTransaction: transactionId,
      };
    });

    await Orders.bulkCreate(productsData);

    // get products detail
    const orderProducts = await Products.findAll({
      where: { id: products.map((item) => item.id) },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const data = orderProducts.map((item) => {
      let orderQuantity = 0;
      const { id, name, price, description } = item;

      products.map((product) => {
        if (product.id === item.id) {
          orderQuantity = product.orderQuantity;
        }
      });

      return {
        id,
        name,
        price,
        description,
        photo: process.env.UPLOADS + item.photo,
        orderQuantity,
      };
    });

    res.send({
      status: "success",
      data: {
        transaction: {
          id: transaction.id,
          user,
          name,
          email,
          phone,
          address,
          posCode,
          attachment: process.env.UPLOADS + transaction.attachment,
          status: "Waiting approve",
          products: data,
          date: transaction.createdAt,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Server Error" });
  }
};

// edit or update transaction
exports.editTransaction = async (req, res) => {
  try {
    const id = req.params.transactionId;

    const transaction = await Transactions.findOne({
      where: { id },
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "fullName", "email"],
        },
        {
          model: Products,
          through: {
            model: Orders,
            attributes: ["qty"],
          },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: { exclude: ["updatedAt"] },
    });

    if (!transaction) {
      return res
        .status(404)
        .send({ status: "failed", message: "Transaction not found" });
    }

    await transaction.update(req.body);

    const data = () => {
      const {
        id,
        user,
        name,
        email,
        phone,
        address,
        attachment,
        status,
        Products,
        createdAt,
        posCode,
      } = transaction;

      const products = Products.map((product) => {
        const { id, name, price, description } = product;
        return {
          id,
          name,
          price,
          description,
          photo: process.env.UPLOADS + product.photo,
          orderQuantity: product.Orders.qty,
        };
      });

      return {
        id,
        user,
        name,
        email,
        phone,
        address,
        posCode,
        attachment: process.env.UPLOADS + attachment,
        status,
        products,
        date: createdAt,
      };
    };

    res.send({
      status: "success",
      data: {
        transaction: data(),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Server Error" });
  }
};

// get my transactions controller
exports.getMyTransactions = async (req, res) => {
  try {
    // query transactions data
    const transactions = await Transactions.findAll({
      // order: [["createdAt", "DESC"]],
      where: { idUser: req.user.id },
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "fullName", "email"],
        },
        {
          model: Products,
          through: {
            model: Orders,
            attributes: ["qty"],
          },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: { exclude: ["idUser", "updatedAt"] },
    });

    const data = transactions.map((item) => {
      const {
        id,
        user,
        name,
        email,
        phone,
        address,
        attachment,
        status,
        posCode,
        createdAt,
      } = item;

      const products = item.Products.map((product) => {
        const { id, name, price, description } = product;
        return {
          id,
          name,
          price,
          description,
          photo: process.env.UPLOADS + product.photo,
          orderQuantity: product.Orders.qty,
        };
      });

      return {
        id,
        user,
        name,
        email,
        phone,
        address,
        posCode,
        attachment: process.env.UPLOADS + attachment,
        status,
        products,
        date: createdAt,
      };
    });

    res.send({
      status: "success",
      data: {
        transactions: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Server Error" });
  }
};
