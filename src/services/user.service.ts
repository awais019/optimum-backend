import { User } from "@prisma/client";
import prisma from "../prisma";
import ejsHelpers from "../helpers/ejs";
import emailHelpers from "../helpers/email";

export default {
  create: (data: any) => {
    return prisma.user.create({
      data: {
        ...data,
        role: data.role.toUpperCase(),
      },
    });
  },
  exists: async (key: string, value: string): Promise<boolean> => {
    const user = await prisma.user.findFirst({
      where: {
        [key]: value,
      },
    });
    return !!user;
  },
  findByEmail: async (email: string): Promise<User | null> => {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  },
  sendVerificationEmail: async (user: User) => {
    const code = Math.floor(100000 + Math.random() * 900000);
    const email = await ejsHelpers.renderHTMLFile("verify", {
      name: user.name,
      code,
    });
    await emailHelpers.sendMail({
      to: user.email,
      subject: "Optimum - Verify your email",
      html: email,
    });
    await prisma.verificationcode.create({
      data: {
        code,
        userId: user.id,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });
  },
};
