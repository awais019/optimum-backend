import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { JwtPayload } from "jsonwebtoken";
import constants from "../constants";
import APIHelpers from "../helpers/APIHelpers";
import jwtHelpers from "../helpers/jwt";
import uploadService from "../services/upload.service";
import documentService from "../services/document.service";

export default {
  upload: async (req: Request, res: Response) => {
    if (!req.files) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.FILE_NOT_FOUND_MESSAGE
      );
    }

    const file = Object.values(req.files)[0] as UploadedFile;

    const fileName = uploadService.uploadDocument(file);

    if (!fileName) {
      return APIHelpers.sendError(
        res,
        constants.INTERNAL_SERVER_ERROR,
        constants.ERROR_MESSAGE
      );
    }

    const token = req.headers[constants.AUTH_HEADER_NAME] as string;
    const { _id } = jwtHelpers.verify(token) as JwtPayload;

    await documentService.create(fileName, _id);

    return APIHelpers.sendSuccess(
      res,
      {
        fileName,
      },
      constants.SUCCESS,
      constants.SUCCESS_MESSAGE
    );
  },
};
