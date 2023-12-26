import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { JwtPayload } from "jsonwebtoken";
import constants from "../constants";
import APIHelpers from "../helpers/APIHelpers";
import jwtHelpers from "../helpers/jwt";
import doctorService from "../services/doctor.service";
import scheduleService from "../services/schedule.service";
import uploadService from "../services/upload.service";
import documentService from "../services/document.service";

export default {
  create: async (req: Request, res: Response) => {
    if (!req.files) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.FILE_NOT_FOUND_MESSAGE
      );
    }

    const { experience, gender } = req.body;

    const token = req.headers[constants.AUTH_HEADER_NAME] as string;
    const { _id } = jwtHelpers.decode(token) as JwtPayload;

    const file = Object.values(req.files)[0] as UploadedFile;

    const fileName = uploadService.uploadDocument(file);

    await doctorService.create(parseInt(experience), gender, _id);
    await documentService.create(fileName, _id);

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

    const schedule = req.body.map((s: any) => {
      return {
        ...s,
        doctorId: doctor.id,
      };
    });

    await scheduleService.createMany(schedule);

    return APIHelpers.sendSuccess(res, null);
  },
  createLocation: async (req: Request, res: Response) => {
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

    await doctorService.createLocation(req.body, doctor.id);

    return APIHelpers.sendSuccess(res, null);
  },
  getAll: async (req: Request, res: Response) => {
    const doctors = await doctorService.getAll();

    return APIHelpers.sendSuccess(
      res,
      doctors.map((doctor) => {
        return {
          id: doctor.id,
          name: doctor.user.name,
          experience: doctor.experience,
          clinicName: doctor.Location?.clinicName,
          address: doctor.Location?.address,
          city: doctor.Location?.city,
          state: doctor.Location?.state,
        };
      })
    );
  },
  get: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.USER_NOT_FOUND_MESSAGE
      );
    }

    const doctor = await doctorService.get(id);

    if (!doctor) {
      return APIHelpers.sendError(
        res,
        constants.NOT_FOUND,
        constants.USER_NOT_FOUND_MESSAGE
      );
    }

    return APIHelpers.sendSuccess(res, {
      id: doctor.id,
      name: doctor.user.name,
      experience: doctor.experience,
      clinicName: doctor.Location?.clinicName,
      address: doctor.Location?.address,
      city: doctor.Location?.city,
      state: doctor.Location?.state,
      charges: doctor.Charges,
    });
  },
};
