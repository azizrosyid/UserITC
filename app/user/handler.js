const { User } = require("../../models");

module.exports = {
  handlerGetUser: async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
  },
  handlerPostUser: async (req, res) => {
    const { email, password, name, organisation } = req.body;
    const user = await User.create({
      email,
      password,
      name,
      role: "user",
      organisation,
    });
    res.status(200).json(user);
  },
};
