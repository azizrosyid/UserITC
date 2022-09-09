const { User } = require("../../models");
const bcrypt = require("bcrypt");
const {
  validateUserCreatePayload,
  validateUserUpdatePayload,
} = require("../../validator/user");

module.exports = {
  handlerGetUser: async (req, res) => {
    const users = await User.findAll();
    console.log(req.body);
    res.status(200).json(users);
  },
  handlerPostUser: async (req, res) => {
    try {
      const { email, password, name, organisation } = req.body;

      validateUserCreatePayload(req.body);
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashPassword,
        name,
        role: "user",
        organisation,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  handlerPutUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, organisation } = req.body;
      validateUserUpdatePayload({ id, name, organisation });

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
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  handlerDeleteUser: async (req, res) => {
    console.log(req.body);
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
  },
  handlerLoginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user){
        throw new Error("User not found");
      }

      const passwordValid = bcrypt.compareSync(password, user.password);
      if (!passwordValid){
        throw new Error("Invalid password");
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
};
