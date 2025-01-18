import { adaptMiddleware } from "@core/infra/adapters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter";
import { makeCreateHeadlineController } from "@modules/game/useCases/CreateHeadline";
import { makeCreateUpdateController } from "@modules/game/useCases/CreateUpdate";
import { makeCreateVehicleController } from "@modules/game/useCases/CreateVehicle";
import { makeDeleteHeadlineController } from "@modules/game/useCases/DeleteHeadline";
import { makeDeleteUpdateController } from "@modules/game/useCases/DeleteUpdate";
import { makeDeleteVehicleController } from "@modules/game/useCases/DeleteVehicle";
import { makeGetAllHeadlinesController } from "@modules/game/useCases/GetAllHeadlinesData";
import { makeGetAllVehiclesController } from "@modules/game/useCases/GetAllVehiclesData";
import { makeGetHeadlineDataController } from "@modules/game/useCases/GetHeadlineData";
import { makeGetRecentUpdateDataController } from "@modules/game/useCases/GetRecentUpdateData";
import { makeGetUpdateDataController } from "@modules/game/useCases/GetUpdateData";
import { makeGetVehicleDataController } from "@modules/game/useCases/GetVehicleData";
import express from "express";
import { makeAuthenticationMiddleware } from "../middlewares/makeAuthenticationMiddleware";
import { makeRateLimitMiddleware } from "../middlewares/makeRateLimitMiddleware";

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

Game.get('/update/get-update', adaptRoute(makeGetUpdateDataController()));

Game.get('/update/get-update-recent', adaptRoute(makeGetRecentUpdateDataController()));

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

Game.get('/vehicle/get-vehicle', adaptRoute(makeGetVehicleDataController()));

Game.post('/headline/create',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeCreateHeadlineController())
);

Game.delete('/headline/delete',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptRoute(makeDeleteHeadlineController())
);

Game.get('/headline/get-headline', adaptRoute(makeGetHeadlineDataController()));

Game.get('/headline/get-all-headlines', adaptRoute(makeGetAllHeadlinesController()));

Game.get('/vehicle/get-all-vehicles', adaptRoute(makeGetAllVehiclesController()));

export { Game };
