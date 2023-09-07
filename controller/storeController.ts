import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { streamUpload } from "../utils/uploadHelper";
const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { title, category, description, cost } = req.body;
    const { secure_url, public_id }: any = await streamUpload(req);

    const user = await prisma.authModel.findUnique({
      where: { id: userID },
      include: { store: true },
    });

    if (user) {
      const product = await prisma.storeModel.create({
        data: {
          title,
          category,
          description,
          cost: parseInt(cost),
          userID,
          image: secure_url,
          imageID: public_id,
          rate: 0,
        },
      });

      user.store.push(product);

      return res.status(201).json({
        message: "product created successfully",
        data: user,
      });
    } else {
      return res.status(404).json({
        message: "user not found",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      data: error,
    });
  }
};

export const viewProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.storeModel.findMany({});

    return res.status(200).json({
      message: "viewing all Product",
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const viewSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const product = await prisma.storeModel.findUnique({
      where: { id: productID },
      include: { comments: true },
    });

    return res.status(200).json({
      message: "viewing single Product",
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const viewSingleUserProduct = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await prisma.authModel.findUnique({
      where: { id: userID },
      include: { store: true },
    });

    if (user) {
      return res.status(201).json({
        message: "view user product",
        data: user.store,
      });
    } else {
      return res.status(404).json({
        message: "user not found",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const { cost } = req.body;

    const product = await prisma.storeModel.update({
      where: { id: productID },
      data: { cost: parseInt(cost) },
    });

    return res.status(201).json({
      message: "product cost update",
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;

    const user = await prisma.storeModel.delete({
      where: { id: productID },
    });

    if (user) {
      return res.status(201).json({
        message: "delete product",
        // data: user.store,
      });
    } else {
      return res.status(404).json({
        message: "product not found",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const rateProduct = async (req: Request, res: Response) => {
  try {
    const { productID, userID } = req.params;
    const { rating } = req.body;
    const user = await prisma.authModel.findUnique({
      where: { id: userID },
    });

    const stored = await prisma.storeModel.findUnique({
      where: { id: productID },
    });

    let total: any = stored?.rating?.reduce((a: number, b: number) => {
      return a + b;
    }, 0);

    if (user) {
      let totalLenght: any = stored?.rating.length;

      stored?.rating.push(rating);
      let rated: number = Math.ceil(total / totalLenght);

      const product = await prisma.storeModel.update({
        where: { id: productID },
        data: { rating: stored?.rating, rate: rated },
      });
      return res.status(201).json({
        message: "rated successfully",
        data: product,
      });
    } else {
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      data: error,
    });
  }
};
