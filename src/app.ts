import "express-async-errors";
import express, { json } from "express";
import { errorHandler } from "./errors/error-handler";
import routes from "./routes/index";
import cors from "cors"

export const app = express();

const startup = async () => {
  app.use(json());
  app.use(cors());
  app.use(cors({
    origin: 'https://www.lowracing.com'
  }));
  app.use(routes());
  app.use(errorHandler);
};

startup();
