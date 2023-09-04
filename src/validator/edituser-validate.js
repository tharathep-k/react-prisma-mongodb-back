const Joi = require("joi");
const editUserSchema = Joi.object({
  email: Joi.string().required().email({ tlds: false }).messages({
    "string.empty": "Email is required.",
    "string.email": "Email format is incorrect",
  }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .trim()
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base": "Password must be at least 6 characters.",
    }),
  confirmpassword: Joi.string().valid(Joi.ref("password")).messages({
    "any.only": "Password and Confrimpassword did not match.",
    "string.empty": "Confirm password is required.",
  }),
  id: Joi.string().required(),
});

exports.validateEditUser = (input) => {
  const { value, error } = editUserSchema.validate(input, {
    abortEarly: false,
  });
  if (error) {
    throw error;
  }
  return value;
};
