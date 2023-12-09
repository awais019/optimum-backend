import { Request, Response, NextFunction } from "express";
import constants from "../constants";
import APIHelpers from "../helpers/APIHelpers";
import jwtHelpers from "../helpers/jwt";
import { JwtPayload } from "jsonwebtoken";
import { ROLE } from "@prisma/client";

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
      const { role } = jwtHelpers.verify(token) as JwtPayload;

      if (role === ROLE.ADMIN) {
        next();
      } else {
        return APIHelpers.sendError(
          res,
          constants.UNAUTHORIZED,
          constants.UNAUTHORIZED_MESSAGE
        );
      }
    } catch (error) {
      return APIHelpers.sendError(
        res,
        constants.UNAUTHORIZED,
        constants.INVALID_TOKEN_MESSAGE
      );
    }
  };
}
