import Joi from "joi";
import { User, ROLE } from "@prisma/client";

export default {
  create: (user: User) => {
    return Joi.object({
      name: Joi.string().min(5).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      role: Joi.string()
        .valid(
          ROLE.ADMIN.toLowerCase(),
          ROLE.DOCTOR.toLowerCase(),
          ROLE.PATIENT.toLowerCase()
        )
        .required(),
    }).validate({
      ...user,
      role: user.role.toLowerCase(),
    });
  },
};
