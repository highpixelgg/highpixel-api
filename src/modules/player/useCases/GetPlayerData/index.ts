import { PrismaPlayerRepository } from "@modules/player/repositories/implementations/PrismaPlayerRepository";
import { Controller } from "core/infra/Controller";
import { PrismaUsersRepository } from "modules/accounts/repositories/implementations/PrismaUsersRepository";
import { GetPlayerData } from "./GetPlayerData";
import { GetPlayerDataController } from "./GetPlayerDataController";

export function makeGetPlayerDataController(): Controller {
  const playerRepository = new PrismaPlayerRepository();
  const userRepository = new PrismaUsersRepository();
  const useCase = new GetPlayerData(playerRepository, userRepository);
  const controller = new GetPlayerDataController(useCase);

  return controller;
}