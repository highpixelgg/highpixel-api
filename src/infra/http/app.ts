import cors from "cors";
import { config } from 'dotenv';
import express, { json } from "express";
import routes from "./routes/index.js";
config();

export const app = express();

const startup = async () => {
  app.use(json());
  app.use(cors());
  app.use(routes());
  app.use(
    cors({
      exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
    })
  )

  app.use(
    express.json({
      type: ['application/json', 'text/plain'],
    })
  )
};

startup();
