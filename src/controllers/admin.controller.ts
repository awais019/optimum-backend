import { Request, Response } from "express";
import constants from "../constants";
import APIHelpers from "../helpers/APIHelpers";
import cryptoHelpers from "../helpers/crypto";
import userService from "../services/user.service";
import { ROLE, VERIFICATIONSTATUS } from "@prisma/client";
import prisma from "../prisma";

export default {
  create: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const hashedPassword = cryptoHelpers.encryptPassword(password);

    const user = await userService.findByEmail(email);

    if (user) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.EMAIL_EXISTS_MESSAGE
      );
    }

    await userService.create({
      name,
      email,
      password: hashedPassword,
      role: ROLE.ADMIN,
      email_verified: true,
    });

    return APIHelpers.sendSuccess(
      res,
      null,
      constants.SUCCESS,
      constants.SUCCESS_MESSAGE
    );
  },
  getDoctors: async (req: Request, res: Response) => {
    const doctors = await prisma.doctor.findMany({
      where: {
        verificationStatus: VERIFICATIONSTATUS.PENDING,
      },
    });

    const _doctors = await Promise.all(
      doctors.map(async (doctor) => {
        const user = await userService.findById(doctor.userId);
        if (!user) {
          return null;
        }
        const location = await prisma.location.findFirst({
          where: {
            doctorId: doctor.id,
          },
        });
        if (!location) {
          return null;
        }
        const document = await prisma.document.findFirst({
          where: {
            doctorId: doctor.id,
          },
        });
        if (!document) {
          return null;
        }

        return {
          id: doctor.id,
          name: user.name,
          experience: doctor.experience,
          clinicName: location.clinicName,
          clinicAddress: location.address,
          clinicCity: location.city,
        };
      })
    );

    return APIHelpers.sendSuccess(
      res,
      _doctors.filter((doctor) => !!doctor),
      constants.SUCCESS,
      constants.SUCCESS_MESSAGE
    );
  },
  getDoctor: async (req: Request, res: Response) => {
    const { id } = req.params;

    const doctor = await prisma.doctor.findFirst({
      where: {
        id,
      },
    });

    if (!doctor) {
      return APIHelpers.sendError(
        res,
        constants.NOT_FOUND,
        constants.USER_NOT_FOUND_MESSAGE
      );
    }

    const user = await userService.findById(doctor.userId);
    if (!user) {
      return APIHelpers.sendError(
        res,
        constants.NOT_FOUND,
        constants.USER_NOT_FOUND_MESSAGE
      );
    }
    const location = await prisma.location.findFirst({
      where: {
        doctorId: doctor.id,
      },
    });
    if (!location) {
      return APIHelpers.sendError(
        res,
        constants.NOT_FOUND,
        constants.USER_NOT_FOUND_MESSAGE
      );
    }
    const document = await prisma.document.findFirst({
      where: {
        doctorId: doctor.id,
      },
    });
    if (!document) {
      return APIHelpers.sendError(
        res,
        constants.NOT_FOUND,
        constants.USER_NOT_FOUND_MESSAGE
      );
    }

    return APIHelpers.sendSuccess(
      res,
      {
        id: doctor.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        verificationStatus: doctor.verificationStatus,
        experience: doctor.experience,
        clinicName: location.clinicName,
        clinicAddress: location.address,
        clinicCity: location.city,
        state: location.state,
        documentName: document.name,
      },
      constants.SUCCESS,
      constants.SUCCESS_MESSAGE
    );
  },
  verifyDoctor: async (req: Request, res: Response) => {
    const { id } = req.params;

    const doctor = await prisma.doctor.findFirst({
      where: {
        id,
      },
    });

    if (!doctor) {
      return APIHelpers.sendError(
        res,
        constants.NOT_FOUND,
        constants.USER_NOT_FOUND_MESSAGE
      );
    }

    await prisma.doctor.update({
      where: {
        id,
      },
      data: {
        verificationStatus: VERIFICATIONSTATUS.VERIFIED,
      },
    });

    return APIHelpers.sendSuccess(
      res,
      null,
      constants.SUCCESS,
      constants.SUCCESS_MESSAGE
    );
  },
};
