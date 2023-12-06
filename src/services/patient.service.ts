import { GENDER } from "@prisma/client";
import prisma from "../prisma";

export default {
  create: (gender: string, dob: string, userId: string) => {
    return prisma.$transaction(async () => {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          gender: gender.toLowerCase() == "male" ? GENDER.MALE : GENDER.FEMALE,
        },
      });
      return prisma.patient.create({
        data: {
          DOB: dob,
          userId,
        },
      });
    });
  },
};
