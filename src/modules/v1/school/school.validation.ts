import Joi = require("joi");


export const createSchoolValidation = (data: Record<string, string>) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        contactEmail: Joi.string().email().required(),
        subdomain: Joi.string().required(),
        description: Joi.string(),
        address: Joi.string(),
        phoneNumber: Joi.string(),
        logoUrl: Joi.string(),
        establishedYear: Joi.number(),
        socialLinks: Joi.string(),
    });
    return schema.validate(data);
};