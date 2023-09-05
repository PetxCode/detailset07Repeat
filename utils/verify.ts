import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const verifyDispatcher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = req.headers.authorization;
    if (value) {
      const realValue = value.split(" ")[1];
      if (realValue) {
        jwt.verify(realValue, "secret", async (err, payload: any) => {
          if (err) {
            return res.status(404).json({
              message: "jwt payload error",
            });
          } else {
            const user = await prisma.authModel.findUnique({
              where: { id: payload },
            });

            if (user?.role === "admin" || user?.role === "dispatcher") {
              next();
            } else {
              return res.status(404).json({
                message: "You're not Authorized to handle this Page",
              });
            }
          }
        });
      } else {
        return res.status(404).json({
          message: "Token gotten not correct",
        });
      }
    } else {
      return res.status(404).json({
        message: "invalid Token",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error Found",
    });
  }
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = req.headers.authorization;
    if (value) {
      const realValue = value.split(" ")[1];
      if (realValue) {
        jwt.verify(realValue, "secret", async (err, payload: any) => {
          if (err) {
            return res.status(404).json({
              message: "jwt payload error",
            });
          } else {
            const user = await prisma.authModel.findUnique({
              where: { id: payload },
            });

            if (user?.role === "admin") {
              next();
            } else {
              return res.status(404).json({
                message: "You're not Authorized to handle this Page",
              });
            }
          }
        });
      } else {
        return res.status(404).json({
          message: "Token gotten not correct",
        });
      }
    } else {
      return res.status(404).json({
        message: "invalid Token",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error Found",
    });
  }
};
