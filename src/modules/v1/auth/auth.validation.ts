import Joi = require("joi");

export const loginValidation = (data: Record<string, string>) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

export const registerValidation = (data: Record<string, string>) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    schoolId: Joi.number().required(),
    role: Joi.string().required(),
  });
  return schema.validate(data);
}