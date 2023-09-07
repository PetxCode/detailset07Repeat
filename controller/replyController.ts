import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();

export const createReply = async (req: Request, res: Response) => {
  try {
    const { reply } = req.body;
    const { userID, commentID } = req.params;
    const user = await prisma.authModel.findUnique({
      where: { id: userID },
    });
    const comment = await prisma.commentModel.findUnique({
      where: { id: commentID },
      include: { reply: true },
    });
    if (user && comment) {
      const replied = await prisma.replyModel.create({
        data: {
          reply,
          commentID,
        },
      });
      comment.reply.push(replied);
      return res.status(201).json({
        message: "reply created",
        data: replied,
      });
    } else {
      return res.status(404).json({
        messsage: "Error",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "error",
    });
  }
};

export const viewAllReply = async (req: Request, res: Response) => {
  try {
    const { userID, commentID } = req.params;

    const comment = await prisma.commentModel.findUnique({
      where: {
        id: commentID,
      },
    });
    const user = await prisma.authModel.findUnique({
      where: {
        id: userID,
      },
    });

    if (user && comment) {
      const reply = await prisma.replyModel.findMany({});

      return res.status(201).json({
        message: "All replied comment gotten",
        data: reply,
      });
    } else {
      return res.status(401).json({
        message: "Error replying comment",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "error",
    });
  }
};
