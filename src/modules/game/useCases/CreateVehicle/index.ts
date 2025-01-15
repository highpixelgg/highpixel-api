import { Controller } from "@core/infra/Controller";
import { PrismaUsersRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaVehicleRepository } from "@modules/game/repositories/implementations/PrismaVehicleRepository";
import { CreateVehicle } from "./CreateVehicle";
import { CreateVehicleController } from "./CreateVehicleController";

export function makeCreateVehicleController(): Controller {
  const vehiclesRepository = new PrismaVehicleRepository();
  const usersRepository = new PrismaUsersRepository();
  const createVehicle = new CreateVehicle(vehiclesRepository, usersRepository);
  const controller = new CreateVehicleController(createVehicle)

  return controller
}