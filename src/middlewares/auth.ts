import { Request, Response, NextFunction } from "express";
import constants from "../constants";
import APIHelpers from "../helpers/APIHelpers";
import jwtHelpers from "../helpers/jwt";

export default function () {
  return function (req: Request, res: Response, next: NextFunction) {
    const token = req.header(constants.AUTH_HEADER_NAME);
    if (!token) {
      return APIHelpers.sendError(
        res,
        constants.UNAUTHORIZED,
        constants.UNAUTHORIZED_MESSAGE
      );
    }
    try {
      jwtHelpers.verify(token);
      next();
    } catch (error) {
      return APIHelpers.sendError(
        res,
        constants.UNAUTHORIZED,
        constants.INVALID_TOKEN_MESSAGE
      );
    }
  };
}
