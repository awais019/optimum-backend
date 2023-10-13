import { Request, Response, NextFunction } from "express";
import APIHelper from "../helpers/APIHelpers";

export default function (handler: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error: any) {
      return APIHelper.sendError(res, error.code, error.message);
    }
  };
}
