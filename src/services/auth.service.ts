import userService from "./user.service";
import { User } from "@prisma/client";
import logger from "../startup/logger";

export default {
  resendEmail: (user: User) => {
    userService.sendVerificationEmail(user).catch((err) => {
      logger.error(err);
    });
  },
};
