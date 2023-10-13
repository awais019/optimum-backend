import { Request, Response, NextFunction } from "express";
import constants from "../constants";
import APIHelpers from "../helpers/APIHelpers";

export default function (validator: Function) {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error } = validator(req.body);
    if (error) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        error.details[0].message
      );
    }
    next();
  };
}
