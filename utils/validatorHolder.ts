import { NextFunction, Request, Response } from "express";
import joi from "joi";

export default (Schema: joi.ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = Schema.validate(req.body);

    if (error) {
      return res.status(404).json({
        message: "validation error",
        data: error,
      });
    } else {
      next();
    }
  };
};

// else {
//     next();
//   }
