import { UploadedFile } from "express-fileupload";
import logger from "../startup/logger";

export default {
  uploadDocument: (file: UploadedFile) => {
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, "")}`;
    const filePath = `${__dirname}/../../uploads/documents/${fileName}`;

    file.mv(filePath, (err) => {
      if (err) {
        logger.error(err);
        return null;
      }
    });
    return fileName;
  },
};
