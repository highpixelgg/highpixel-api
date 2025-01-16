import { Controller } from "@core/infra/Controller";
import { PrismaUsersRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaPlayerRepository } from "@modules/player/repositories/implementations/PrismaPlayerRepository";
import { AddVehiclePlayer } from "./AddVehiclePlayer";
import { AddVehiclePlayerController } from "./AddVehiclePlayerController";

export function makeAddVehiclePlayerController(): Controller {
  const playerRepository = new PrismaPlayerRepository();
  const userRepository = new PrismaUsersRepository();
  const useCase = new AddVehiclePlayer(playerRepository, userRepository);
  const controller = new AddVehiclePlayerController(useCase);

  return controller;
}