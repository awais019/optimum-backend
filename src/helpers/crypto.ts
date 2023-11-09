import Crypto from "crypto-js";

export default {
  encryptPassword: (password: string) => {
    return Crypto.AES.encrypt(
      password,
      process.env.ENCRYPTION_SECRET as string
    ).toString();
  },
  decryptPassword: (hashedPassword: string) => {
    return Crypto.AES.decrypt(
      hashedPassword,
      process.env.ENCRYPTION_SECRET as string
    ).toString(Crypto.enc.Utf8);
  },
  comparePassword: (password: string, hashedPassword: string) => {
    return (
      Crypto.AES.decrypt(
        hashedPassword,
        process.env.ENCRYPTION_SECRET as string
      ).toString(Crypto.enc.Utf8) === password
    );
  },
};
