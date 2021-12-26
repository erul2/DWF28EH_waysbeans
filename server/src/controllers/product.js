const { Products } = require("../../models");
const Joi = require("joi");

// get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const productsData = products.map((product) => {
      const { id, name, price, description, stock } = product;
      return {
        id,
        name,
        price,
        description,
        stock,
        photo: process.env.UPLOADS + product.photo,
      };
    });

    res.send({
      status: "success",
      data: {
        products: productsData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Server Error" });
  }
};

// get products details
exports.getProduct = async (req, res) => {
  try {
    const id = req.params.productId;

    const products = await Products.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (products.length === 0) {
      return res
        .status(404)
        .send({ status: "failed", message: "Product not found" });
    }

    const { name, price, description, stock } = products;

    const productsData = {
      id,
      name,
      price,
      description,
      stock,
      photo: process.env.UPLOADS + products.photo,
    };

    res.send({
      status: "success",
      data: {
        products: productsData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Server Error" });
  }
};

// add new product controller
exports.addProduct = async (req, res) => {
  // validation scheme
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.string().required(),
    description: Joi.string().required(),
    stock: Joi.string().required(),
    // photo: Joi.string().required(),
  });

  // do validation
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: "failed",
      message: error.details[0].message,
    });
  }

  try {
    if (!req.file) {
      return res.status(400).send({
        status: "failed",
        message: "Product Photo is required",
      });
    }
    const { name, price, description, stock } = req.body;
    // store data to database
    const product = await Products.create({
      name,
      price,
      description,
      stock,
      photo: req.file.filename,
    });

    res.send({
      status: "success",
      data: {
        product: {
          id: product.id,
          name,
          price,
          description,
          photo: process.env.UPLOADS + product.photo,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Server Error" });
  }
};
