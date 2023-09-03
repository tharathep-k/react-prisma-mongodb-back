const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().required().email({ tlds: false }).messages({
    "string.empty": "Email is required.",
    "string.email": "Email format is incorrect",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
  }),
});

exports.validateLogin = (input) => {
  const { value, error } = loginSchema.validate(input, { abortEarly: false });
  if (error) {
    throw error;
  }
  return value;
};
