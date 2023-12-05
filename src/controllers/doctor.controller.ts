import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { JwtPayload } from "jsonwebtoken";
import constants from "../constants";
import APIHelpers from "../helpers/APIHelpers";
import jwtHelpers from "../helpers/jwt";
import doctorService from "../services/doctor.service";
import scheduleService from "../services/schedule.service";

export default {
  create: async (req: Request, res: Response) => {
    const { experience } = req.body;

    const token = req.headers[constants.AUTH_HEADER_NAME] as string;
    const { _id } = jwtHelpers.decode(token) as JwtPayload;

    await doctorService.create(experience, _id);

    return APIHelpers.sendSuccess(res, null);
  },
  createCharges: async (req: Request, res: Response) => {
    const token = req.headers[constants.AUTH_HEADER_NAME] as string;
    const { _id } = jwtHelpers.verify(token) as JwtPayload;

    const doctor = await doctorService.findByUserId(_id);

    if (!doctor) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.USER_NOT_FOUND_MESSAGE
      );
    }

    await doctorService.createCharges(req.body, doctor.id);

    return APIHelpers.sendSuccess(
      res,
      null,
      constants.SUCCESS,
      constants.SUCCESS_MESSAGE
    );
  },
  createSchedule: async (req: Request, res: Response) => {
    let { schedule } = req.body;
    const token = req.headers[constants.AUTH_HEADER_NAME] as string;
    console.log(schedule);

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
        ...s,
        doctorId: doctor.id,
      };
    });
    console.log(schedule);

    await scheduleService.createMany(schedule);

    return APIHelpers.sendSuccess(res, null);
  },
};
