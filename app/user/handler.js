const { User } = require("../../models");
const bcrypt = require("bcrypt");

module.exports = {
  handlerGetUser: async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
  },
  handlerPostUser: async (req, res) => {
    const { email, password, name, organisation } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashPassword,
      name,
      role: "user",
      organisation,
    });
    res.status(200).json(user);
  },
  handlerPutUser: async (req, res) => {
    const { id } = req.params;
    const { name, organisation } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      await user.update({
        name,
        organisation,
      });
      res.status(200).json(user);
    }
  },
  handlerDeleteUser: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      await user.destroy();
      res.status(200).json({
        message: "User deleted",
      });
    }
  }
};
