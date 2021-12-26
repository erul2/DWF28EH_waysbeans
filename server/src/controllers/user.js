const { Users } = require("../../models");
const fs = require("fs");

// get user details
exports.getUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!user) {
      return res
        .status(404)
        .send({ status: "failed", message: "User not found" });
    }

    const { id, fullName, email } = user;

    res.send({
      status: "success",
      data: {
        users: {
          id,
          fullName,
          email,
          photo: user.photo ? process.env.UPLOADS + user.photo : null,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Server Error" });
  }
};

// edit user conttroller
exports.editUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { id: req.user.id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!user) {
      return res
        .status(404)
        .send({ status: "failed", message: "User not found" });
    }

    let photo = null;

    if (req.file) {
      photo = req.file.filename;
      // preform delete old photo
      fs.unlink(`uploads/${user.photo}`, (err) => {
        err ? console.log(err) : null;
      });
    } else {
      photo = user.photo;
    }

    await user.update({
      ...req.body,
      photo,
    });

    const { id, fullName, email } = user;

    res.send({
      status: "success",
      data: {
        users: {
          id,
          fullName,
          email,
          photo: user.photo ? process.env.UPLOADS + user.photo : null,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Server Error" });
  }
};

// get user details
exports.getUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!user) {
      return res
        .status(404)
        .send({ status: "failed", message: "User not found" });
    }

    const { id, fullName, email } = user;

    res.send({
      status: "success",
      data: {
        users: {
          id,
          fullName,
          email,
          photo: user.photo ? process.env.UPLOADS + user.photo : null,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Server Error" });
  }
};

// check user conttroller
exports.checkUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { id: req.user.id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!user) {
      return res
        .status(404)
        .send({ status: "failed", message: "User not found" });
    }

    const { id, fullName, email } = user;

    res.send({
      status: "success",
      data: {
        users: {
          id,
          fullName,
          email,
          photo: user.photo ? process.env.UPLOADS + user.photo : null,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Server Error" });
  }
};
