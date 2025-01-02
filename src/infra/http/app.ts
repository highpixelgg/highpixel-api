import "express-async-errors";
import express, { json } from "express";
import routes from "./routes/index";
import cors from "cors"

export const app = express();

const startup = async () => {
  app.use(json());
  app.use(cors());
  app.use(cors({
    origin: `http://localhost:${process.env.PORT}`
  }));
  app.use(routes());
};

startup();
