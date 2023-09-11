import express, { Application } from "express";
import { mainApp } from "./mainApp";

const app: Application = express();
const port: number = 1122;

mainApp(app);

const server = app.listen(process.env.PORT || port, () => {
  console.log();
  console.log("server connected");
});

process.on("uncaughtException", (error: Error) => {
  console.log(`shutting down due to uncaughtException: ${error}`);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log(`shutting down due to unhandledRejection: ${reason}`);

  server.close(() => {
    process.exit(1);
  });
});
