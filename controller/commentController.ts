import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userID, productID } = req.params;
    const { comment } = req.body;

    const user = await prisma.authModel.findUnique({
      where: { id: userID },
    });

    const product = await prisma.storeModel.findUnique({
      where: {
        id: productID,
      },
      include: { comments: true },
    });

    if (user && product) {
      const message = await prisma.commentModel.create({
        data: {
          comment,
          storeID: productID,
          userID,
        },
      });
      product.comments.push(message);

      return res.status(201).json({
        message: "comment created",
        data: product.comments,
      });
    } else {
      return res.status(404).json({
        message: "Error making comment",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "error creating comment",
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentID, userID } = req.params;

    const user = await prisma.authModel.findUnique({
      where: { id: userID },
    });

    const commented = await prisma.commentModel.findUnique({
      where: {
        id: commentID,
      },
    });

    console.log(user?.id);

    console.log(user?.id, commented?.userID);

    if (user?.id === commented?.userID) {
      await prisma.commentModel.delete({
        where: { id: commentID },
      });
      return res.status(201).json("comment deleted");
    } else {
      return res.status(404).json({
        message: "na you comment am?",
      });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "error deleting comment", data: error });
  }
};

export const viewProductComment = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const viewProduct = await prisma.storeModel.findUnique({
      where: { id: productID },
      include: { comments: true },
    });
    return res.status(200).json({
      message: "All Product Comment",
      data: viewProduct?.comments,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error viewing comment",
    });
  }
};
