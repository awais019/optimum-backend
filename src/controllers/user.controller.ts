import { Request, Response } from "express";
import constants from "../constants";
import APIHelpers from "../helpers/APIHelpers";
import userService from "../services/user.service";

export default {
  create: async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    if (await userService.exists("email", email)) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.EMAIL_EXISTS_MESSAGE
      );
    }

    await userService.create({ name, email, password, role });
    return APIHelpers.sendSuccess(
      res,
      null,
      constants.SUCCESS,
      constants.SUCCESS_MESSAGE
    );
  },
};
