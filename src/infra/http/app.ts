import cors from "cors";
import 'dotenv/config';
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Router } from "./routes/index";

class LowRacingAPI {
  public app: express.Application;
  public io: Server;  
  public server: any;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      }
    })
    this.middlewares();
  }

  private middlewares(): void {
    this.app.use(
      cors({
        exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
      })
    );
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json({ type: ['application/json', 'text/plain'] }));
    this.app.use(Router)
  }
};

export default new LowRacingAPI().server;