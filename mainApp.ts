import express, { Application } from "express";
import cors from "cors";
import auth from "./router/authRouter";

export const mainApp = (app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.set("view engine", "ejs");

  app.use("/api", auth);
};
