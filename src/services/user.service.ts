import prisma from "../prisma";

export default {
  create: (data: any) => {
    return prisma.user.create({
      data: {
        ...data,
        role: data.role.toUpperCase(),
      },
    });
  },
};
