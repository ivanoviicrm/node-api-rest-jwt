const Joi = require('@hapi/joi');

// Schema used to validate User Register
const loginValidationsSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

// Schema used to validate User Register
const registerValidationsSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

module.exports.loginValidationsSchema = loginValidationsSchema;
module.exports.registerValidationsSchema = registerValidationsSchema;