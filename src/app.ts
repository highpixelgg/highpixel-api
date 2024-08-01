import "express-async-errors";
import express, { json } from "express";
import { errorHandler } from "./errors/error-handler";
import routes from "./routes/index";

export const app = express();

const startup = async () => {
  app.use(json());
  app.use(routes());
  app.use(errorHandler);
};

startup();
