import { Controller } from "@core/infra/Controller";
import { PrismaUsersRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaVehicleRepository } from "@modules/game/repositories/implementations/PrismaVehicleRepository";
import { DeleteVehicle } from "./DeleteVehicle";
import { DeleteVehicleController } from "./DeleteVehicleController";

export function makeDeleteVehicleController(): Controller {
  const usersRepository = new PrismaUsersRepository();
  const vehiclesRepository = new PrismaVehicleRepository();
  const deleteVehicle = new DeleteVehicle(usersRepository, vehiclesRepository);
  const controller = new DeleteVehicleController(deleteVehicle)

  return controller
}