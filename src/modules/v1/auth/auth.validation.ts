import Joi = require("joi");

export const loginValidation = (data: Record<string, string>) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};