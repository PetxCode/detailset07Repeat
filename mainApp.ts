import express, { Application, Request, Response } from "express";
import cors from "cors";
import auth from "./router/authRouter";
import morgan from "morgan";
import helmet from "helmet";
import store from "./router/storeRouter";
import comment from "./router/CommentRouter";
import puppet from "puppeteer";

export const mainApp = (app: Application) => {
  app.use(cors());

  app.use(morgan("dev"));
  app.use(helmet());

  app.use(express.json());
  app.set("view engine", "ejs");

  app.use("/api", auth);
  app.use("/api", store);
  app.use("/api", comment);

  app.get("/", async (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "This is the Test...",
      });
    } catch (error) {
      return res.status(404).json({
        message: "Error",
        data: error,
      });
    }
  });
};
