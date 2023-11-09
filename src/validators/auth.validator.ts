import Joi from "joi";

export default {
  resendEmail: (body: { email: string }) => {
    return Joi.object({
      email: Joi.string().email().required(),
    }).validate(body);
  },
};
