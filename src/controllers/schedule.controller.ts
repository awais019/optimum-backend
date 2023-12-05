import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import constants from "../constants";
import APIHelpers from "../helpers/APIHelpers";
import jwtHelpers from "../helpers/jwt";
import doctorService from "../services/doctor.service";
import scheduleService from "../services/schedule.service";

export default {
  create: async (req: Request, res: Response) => {
    let { schedule } = req.body;
    const token = req.headers[constants.AUTH_HEADER_NAME] as string;

    const { _id } = jwtHelpers.decode(token) as JwtPayload;

    const doctor = await doctorService.findByUserId(_id);

    if (!doctor) {
      return APIHelpers.sendError(
        res,
        constants.NOT_FOUND,
        constants.USER_NOT_FOUND_MESSAGE
      );
    }

    schedule = schedule.map((s: any) => {
      return {
        ...schedule,
        doctorId: doctor.id,
      };
    });

    await scheduleService.createMany(schedule);

    return APIHelpers.sendSuccess(res, null);
  },
};
