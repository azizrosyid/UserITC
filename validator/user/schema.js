const Joi = require("joi");

const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(3).required(),
  organisation: Joi.string().required(),
}).unknown();

const userUpdateSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().min(3).required(),
  organisation: Joi.string().required(),
}).unknown();

module.exports = {
    userCreateSchema,
    userUpdateSchema,
}