import { Request, Response } from "express";
import constants from "../constants";
import APIHelpers from "../helpers/APIHelpers";
import jwtHelpers from "../helpers/jwt";
import userService from "../services/user.service";
import { JwtPayload } from "jsonwebtoken";

export default {
  verifyEmail: async (req: Request, res: Response) => {
    const user = await userService.findByEmail(req.body.email);

    if (!user) {
      return APIHelpers.sendError(
        res,
        constants.NOT_FOUND,
        constants.USER_NOT_FOUND_MESSAGE
      );
    }
    if (user.email_verified) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.EMAIL_ALREADY_VERIFIED_MESSAGE
      );
    }

    const codeVerification = await userService.verifyEmail(user, req.body.code);

    if (!codeVerification) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.INVALID_CODE_MESSAGE
      );
    }

    const token = jwtHelpers.sign({
      _id: user.id,
      email: user.email,
    });

    return APIHelpers.sendSuccess(
      res,
      token,
      constants.SUCCESS,
      constants.SUCCESS_MESSAGE
    );
  },
  resendEmail: async (req: Request, res: Response) => {
    const user = await userService.findByEmail(req.body.email);

    if (!user) {
      return APIHelpers.sendError(
        res,
        constants.NOT_FOUND,
        constants.USER_NOT_FOUND_MESSAGE
      );
    }

    if (user.email_verified) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.EMAIL_ALREADY_VERIFIED_MESSAGE
      );
    }

    userService.sendEmail(user);

    return APIHelpers.sendSuccess(
      res,
      null,
      constants.SUCCESS,
      constants.SUCCESS_MESSAGE
    );
  },

  updateProfile: async (req: Request, res: Response) => {
    const token = req.headers["x-auth-token"] as string;
    const user = jwtHelpers.verify(token) as JwtPayload;

    const data = {
      ...req.body,
      role: req.body.role.toUpperCase(),
    };

    const updatedUser = await userService.update(user.id, data);

    return APIHelpers.sendSuccess(
      res,
      updatedUser,
      constants.SUCCESS,
      constants.SUCCESS_MESSAGE
    );
  },
};
