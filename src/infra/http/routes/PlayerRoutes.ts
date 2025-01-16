import { adaptMiddleware } from "@core/infra/adapters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter";
import { makeGetPlayerDataController } from "@modules/player/useCases/GetPlayerData";
import express from "express";
import { makeAuthenticationMiddleware } from "../middlewares/makeAuthenticationMiddleware";
import { makeRateLimitMiddleware } from "../middlewares/makeRateLimitMiddleware";
import { makeUpdatePlayerMoneyController } from "@modules/player/useCases/UpdatePlayerMoney";
import { makeAddVehiclePlayerController } from "@modules/player/useCases/AddVehiclePlayer";

const Player = express.Router();
Player.use(adaptMiddleware(makeAuthenticationMiddleware()));

Player.post('/add-vehicle-player',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeAddVehiclePlayerController())
);

Player.get('/get-player',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeGetPlayerDataController())
);

Player.put('/update-player-money',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeUpdatePlayerMoneyController())
);

export { Player };
