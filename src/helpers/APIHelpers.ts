import { Response } from "express";
import constants from "../constants";

export default {
  sendSuccess: <T>(
    res: Response,
    data: T | null,
    code = constants.SUCCESS,
    message = constants.SUCCESS_MESSAGE
  ) => {
    if (data) {
      return res.status(code).send({ message, data });
    } else {
      return res.status(code).send({ message });
    }
  },
  sendError: (
    res: Response,
    code = constants.INTERNAL_SERVER_ERROR,
    message = constants.ERROR_MESSAGE
  ) => {
    return res.status(code).send({ message });
  },
};
