import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { JwtPayload } from "jsonwebtoken";
import constants from "../constants";
import APIHelpers from "../helpers/APIHelpers";
import jwtHelpers from "../helpers/jwt";
import doctorService from "../services/doctor.service";

export default {
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
};
