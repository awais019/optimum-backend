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
  exists: async (key: string, value: string): Promise<boolean> => {
    const user = await prisma.user.findFirst({
      where: {
        [key]: value,
      },
    });
    return !!user;
  },
};
