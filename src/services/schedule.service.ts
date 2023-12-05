import { Schedule } from "@prisma/client";
import prisma from "../prisma";

export default {
  createMany: (schedule: Schedule[]) => {
    return prisma.schedule.createMany({
      data: schedule,
    });
  },
};
