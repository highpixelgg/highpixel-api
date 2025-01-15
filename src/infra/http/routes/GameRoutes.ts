import { adaptMiddleware } from "@core/infra/adapters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter";
import { makeCreateUpdateController } from "@modules/game/useCases/CreateUpdate";
import express from "express";
import { makeAuthenticationMiddleware } from "../middlewares/makeAuthenticationMiddleware";
import { makeRateLimitMiddleware } from "../middlewares/makeRateLimitMiddleware";
import { makeCreateVehicleController } from "@modules/game/useCases/CreateVehicle";
import { makeDeleteVehicleController } from "@modules/game/useCases/DeleteVehicle";
import { makeDeleteUpdateController } from "@modules/game/useCases/DeleteUpdate";
import { makeGetUpdateDataController } from "@modules/game/useCases/GetUpdateData";
import { makeGetVehicleDataController } from "@modules/game/useCases/GetVehicleData";
import { makeGetAllVehiclesController } from "@modules/game/useCases/GetAllVehiclesData";
import { makeGetRecentUpdateDataController } from "@modules/game/useCases/GetRecentUpdateData";

const Game = express.Router();
Game.use(adaptMiddleware(makeAuthenticationMiddleware()));

Game.post('/update/create',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeCreateUpdateController())
);

Game.delete('/update/delete',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeDeleteUpdateController())
);

Game.get('/update/get-update',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeGetUpdateDataController())
);

Game.get('/update/get-update-recent',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeGetRecentUpdateDataController())
);

Game.post('/vehicle/create',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeCreateVehicleController())
);

Game.delete('/vehicle/delete',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeDeleteVehicleController())
);

Game.get('/vehicle/get-vehicle',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeGetVehicleDataController())
);

Game.get('/vehicle/get-all-vehicles',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeGetAllVehiclesController())
);

export { Game };