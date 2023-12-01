import { APPOINTMENTTYPES, Doctor } from "@prisma/client";
import prisma from "../prisma";

export default {
  findByUserId: (userId: string): Promise<Doctor | null> => {
    return prisma.doctor.findFirst({
      where: {
        userId,
      },
    });
  },
  createCharges: async (
    charges: {
      appointment_type: string;
      charges: number;
    }[],
    doctorId: string
  ) => {
    if (charges.length == 2) {
      await prisma.doctor.update({
        where: {
          id: doctorId,
        },
        data: {
          appointmentTypes: {
            set: [APPOINTMENTTYPES.PHYSICAL, APPOINTMENTTYPES.VIRTUAL],
          },
        },
      });
    }

    return prisma.charges.createMany({
      data: charges.map((charge) => ({
        appointment_type:
          charge.appointment_type == "PHYSICAL"
            ? APPOINTMENTTYPES.PHYSICAL
            : APPOINTMENTTYPES.VIRTUAL,
        charges: charge.charges,
        doctorId: doctorId,
      })),
    });
  },
};
