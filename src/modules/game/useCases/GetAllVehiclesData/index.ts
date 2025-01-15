import { Controller } from "@core/infra/Controller";
import { PrismaUsersRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaVehicleRepository } from "@modules/game/repositories/implementations/PrismaVehicleRepository";
import { GetAllVehicleData } from "./GetAllVehiclesData";
import { GetAllVehiclesController } from "./GetAllVehiclesDataController";

export function makeGetAllVehiclesController(): Controller {
  const vehiclesRepository = new PrismaVehicleRepository();
  const usersRepository = new PrismaUsersRepository();
  const createUpdate = new GetAllVehicleData(vehiclesRepository, usersRepository);
  const controller = new GetAllVehiclesController(createUpdate)

  return controller
}