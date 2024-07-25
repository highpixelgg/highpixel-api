import "express-async-errors";
import express, { json } from "express";
import { errorHandler } from "./errors/error-handler";
import { Producer } from "./infra/index";
import { amqp } from "./amqp";
import routes from "./routes/index";
import { init } from './infra/services/mailer/index'

export const app = express();
export const PasswordRecoveryPublisher = new Producer(
  "RECOVERY_PASSWORD",
  amqp
);

const startup = async () => {
  app.use(json());
  app.use(routes());
  app.use(errorHandler);
  app.use(init);
};

startup();
