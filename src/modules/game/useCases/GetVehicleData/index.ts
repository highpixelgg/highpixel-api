import { PrismaVehicleRepository } from "@modules/game/repositories/implementations/PrismaVehicleRepository";
import { Controller } from "core/infra/Controller";
import { PrismaUsersRepository } from "modules/accounts/repositories/implementations/PrismaUsersRepository";
import { GetVehicleData } from "./GetVehicle";
import { GetVehicleDataController } from "./GetVehicleController";

export function makeGetVehicleDataController(): Controller {
  const vehicleRepository = new PrismaVehicleRepository();
  const userRepository = new PrismaUsersRepository();
  const useCase = new GetVehicleData(vehicleRepository, userRepository);
  const controller = new GetVehicleDataController(useCase);

  return controller;
}