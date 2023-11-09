import { User } from "@prisma/client";
import prisma from "../prisma";
import userService from "./user.service";
import logger from "../startup/logger";

export default {
  verifyEmail: async (user: User, code: number): Promise<boolean> => {
    const verificationCode = await prisma.verificationcode.findFirst({
      where: {
        code,
        userId: user.id,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!verificationCode) {
      return false;
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email_verified: true,
      },
    });

    return true;
  },
  resendEmail: async (user: User) => {
    await prisma.verificationcode.deleteMany({
      where: {
        userId: user.id,
      },
    });
    userService.sendVerificationEmail(user).catch((err) => {
      logger.error(err);
    });
  },
};
