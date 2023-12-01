import prisma from "../prisma";

export default {
  create: (name: string, userId: string) => {
    return prisma.document.create({
      data: {
        name,
        Doctor: {
          connect: {
            userId,
          },
        },
      },
    });
  },
};
