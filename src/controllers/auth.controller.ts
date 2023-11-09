import { Request, Response } from "express";
import constants from "../constants";
import APIHelpers from "../helpers/APIHelpers";
import authService from "../services/auth.service";
import userService from "../services/user.service";

export default {
  resendEmail: async (req: Request, res: Response) => {
    const user = await userService.findByEmail(req.body.email);

    if (!user) {
      return APIHelpers.sendError(
        res,
        constants.NOT_FOUND,
        constants.USER_NOT_FOUND_MESSAGE
      );
    }

    authService.resendEmail(user);

    return APIHelpers.sendSuccess(
      res,
      null,
      constants.SUCCESS,
      constants.SUCCESS_MESSAGE
    );
  },
};
