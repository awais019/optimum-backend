import Joi from "joi";

export default {
  verifyEmail: (body: { email: string; code: number }) => {
    return Joi.object({
      email: Joi.string().email().required(),
      code: Joi.number().required(),
    }).validate(body);
  },
  resendEmail: (body: { email: string }) => {
    return Joi.object({
      email: Joi.string().email().required(),
    }).validate(body);
  },
  signIn: (body: { email: string; password: string }) => {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).validate(body);
  },
};
