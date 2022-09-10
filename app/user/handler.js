const { User } = require("../../models");
const bcrypt = require("bcrypt");
const {
  validateUserCreatePayload,
  validateUserUpdatePayload,
} = require("../../validator/user");
const { generateAccessToken } = require("../../utils/TokenManager");

module.exports = {
  handlerGetUser: async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.status(200).json({
        status: "success",
        message: "Get all users",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPostUser: async (req, res, next) => {
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
      res.status(200).json({
        status: "success",
        message: "User created",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPutUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, organisation } = req.body;
      validateUserUpdatePayload({ id, name, organisation });

      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await user.update({
        name,
        organisation,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  handlerDeleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await user.destroy();
      res.status(200).json({
        message: "User deleted",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerLoginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const passwordValid = bcrypt.compareSync(password, user.password);
      if (!passwordValid) {
        throw new Error("Invalid password");
      }

      const accessToken = generateAccessToken({
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      });

      res.status(200).json({
        status: "success",
        message: "Login success",
        data: {
          user,
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
